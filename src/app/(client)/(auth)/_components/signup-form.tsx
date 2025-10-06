'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { ActionResult } from '@/types';
import { signup } from '../lib/actions';
import React, { useActionState } from 'react';
import Link from 'next/link';

const initialState: ActionResult = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full cursor-pointer">
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait...
        </>
      ) : (
        'Create account'
      )}
    </Button>
  );
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction] = useActionState(signup, initialState);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to sign up for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.error && <p className="text-red-500 mb-2">{state.error}</p>}
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="university">Universitas</Label>
                <Input
                  id="university"
                  name="university"
                  type="text"
                  placeholder="Universitas Bina Sarana Informatika"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="faculty">Fakultas</Label>
                  <Input
                    id="faculty"
                    name="faculty"
                    type="text"
                    placeholder="Teknik & Informatika"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="studyProgram">Program Studi</Label>
                  <Input
                    id="studyProgram"
                    name="studyProgram"
                    type="text"
                    placeholder="Sistem Informasi"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Ketik ulang password Anda"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <SubmitButton />
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="mt-4 text-center text-sm">
                Aleardy have an account?{' '}
                <Link href="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
              <Link
                href="/"
                className="flex hover:underline underline-offset-4"
              >
                {`< Back`}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
