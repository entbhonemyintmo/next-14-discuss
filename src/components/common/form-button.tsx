import { Button } from '@nextui-org/react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  children: ReactNode;
}

export function FormButton({ children }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit">
      {children}
    </Button>
  );
}
