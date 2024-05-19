'use server';
import * as auth from '@/config/auth';

export async function signOut() {
  return auth.signOut();
}
