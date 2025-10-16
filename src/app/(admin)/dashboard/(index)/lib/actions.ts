'use server';

import { ActionResult } from '@/types';
import { signOut } from '@/lib/auth';

export async function logout(): Promise<ActionResult> {
  await signOut({ redirectTo: '/' });
  return { success: 'Logged out successfully', error: '' };
}
