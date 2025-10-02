import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Logout } from '../_components/logout-form';
import Link from 'next/link';
import React from 'react';

export default async function MyProfilePage() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <main className="container mx-auto px-5">
      <section className="flex flex-col items-center justify-center gap-1 min-h-screen">
        <h1 className="text-xl font-medium">{session?.user.name}</h1>
        <span className="text-base">{session?.user.email}</span>
        <span className="text-base">{session?.user.role}</span>
        <Button variant="outline" asChild>
          <Link href={`/`}>Home</Link>
        </Button>
        <Logout />
      </section>
    </main>
  );
}
