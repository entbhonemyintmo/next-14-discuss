'use client';
import { signIn, signOut } from '@/actions';
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-2">
            <form action={signOut}>
              <Button type="submit" color="danger" variant="bordered">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}
