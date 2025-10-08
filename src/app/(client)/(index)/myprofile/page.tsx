import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Logout } from '../_components/logout-form';
import { getAllThreadsByUserId } from '../lib/data';
import { ThreadsCards } from '../_components/threads-cards';
import Link from 'next/link';
import React from 'react';

export default async function MyProfilePage() {
  const session = await auth();
  const threads = await getAllThreadsByUserId(session?.user?.id || '', 1, 10);
  const currentUserId = session?.user?.id;

  if (!session?.user) return null;

  return (
    <main className="container mx-auto px-5 space-y-6">
      <section className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-medium">{session?.user.name}</h1>
        <span className="text-base">{session?.user.email}</span>
        <span className="text-base">{session?.user.role}</span>
        <Button variant="outline" asChild>
          <Link href={`/`}>Home</Link>
        </Button>
        <Logout />
      </section>

      <section className="space-y-4">
        {threads.length > 0 ? (
          <ThreadsCards threads={threads} currentUserId={currentUserId} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Belum ada thread
            </h2>
            <p className="text-sm text-muted-foreground">
              Ayo jadi yang pertama untuk memulai diskusi!
            </p>
            <Button asChild>
              <Link href="/threads/create">Mulai Diskusi</Link>
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
