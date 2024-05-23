'use client';
import { createTopic } from '@/actions';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';

export default function TopicCreateForm() {
  const [state, action] = useFormState(createTopic, { errors: {} });

  return (
    <Popover placement="left-start">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>

            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!state.errors.name}
              errorMessage={state.errors.name?.join(', ')}
            />

            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Description"
              isInvalid={!!state.errors.description}
              errorMessage={state.errors.description?.join(', ')}
            />

            {state.errors?._form && (
              <div className="rounded-lg px-4 py-2 bg-red-200 border border-red-400 font-medium">
                {state.errors._form.join(', ')}
              </div>
            )}

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
