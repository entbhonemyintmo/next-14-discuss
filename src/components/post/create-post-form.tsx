'use client';

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { FormButton } from '../common';
import { useFormState } from 'react-dom';
import { createPost } from '@/actions';

interface PostCreateFormProps {
  topicName: string;
}

export default function PostCreateForm({ topicName }: PostCreateFormProps) {
  const [state, action] = useFormState(createPost.bind(null, topicName), {
    errors: {},
  });

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button color="primary">Create a post</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col p-4 gap-4 w-80">
            <h1 className="text-lg">Create a Post</h1>

            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!state.errors.title}
              errorMessage={state.errors.title?.join(', ')}
            />

            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!state.errors.content}
              errorMessage={state.errors.content?.join(', ')}
            />

            {state.errors?._form && (
              <div className="rounded-lg px-4 py-2 bg-red-200 border border-red-400 font-medium">
                {state.errors._form.join(', ')}
              </div>
            )}

            <FormButton>Create</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
