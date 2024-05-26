'use server';

import { auth } from '@/config/auth';
import { db } from '@/db';
import { Path } from '@/utils';
import type { Post, Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(15),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  topicName: string,
  _: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ['you need to sign in to do this!'] } };
  }

  let topic: Topic;
  try {
    topic = await db.topic.findFirstOrThrow({ where: { slug: topicName } });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { _form: [e.message] } };
    } else {
      return { errors: { _form: ['Oops!, failed to create post'] } };
    }
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        ...result.data,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { _form: [e.message] } };
    } else {
      return { errors: { _form: ['Oops!, failed to create post'] } };
    }
  }

  revalidatePath(Path.home());
  redirect(Path.postShow(topic.slug, post.id));
}
