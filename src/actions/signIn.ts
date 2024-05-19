'use server';
import * as auth from '@/config/auth';

export async function signIn() {
  return auth.signIn('github');
}
