'use server';

import { auth } from '@/config/auth';
import { db } from '@/db';
import { Path } from '@/utils';
import { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes without spaces',
    }),
  description: z.string().min(10),
});

interface createTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  _: createTopicFormState,
  formData: FormData
): Promise<createTopicFormState> {

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
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
    topic = await db.topic.create({
      data: { slug: result.data.name, description: result.data.description },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { _form: [e.message] } };
    } else {
      return { errors: { _form: ['Oops!, failed to create topic'] } };
    }
  }

  revalidatePath(Path.home());
  redirect(Path.topicShow(topic.slug));
}
