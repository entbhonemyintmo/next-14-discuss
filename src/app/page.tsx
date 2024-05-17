import { Button } from '@nextui-org/react';
import * as actions from '@/actions';
import { auth } from '@/config/auth';

export default async function Home() {
  const session = await auth();

  const isLogin = session?.user;

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {isLogin && <h1>{isLogin?.name}</h1>}
      <form action={isLogin ? actions.signOut : actions.signIn}>
        <Button type="submit">{isLogin ? 'Sign Out!' : 'Sign In'}</Button>
      </form>
    </main>
  );
}
