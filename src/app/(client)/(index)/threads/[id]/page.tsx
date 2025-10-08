import { auth } from '@/lib/auth';
import { getThreadById } from '../../lib/data';
import { ParamsType } from '@/types';
import { ThreadDetailView } from '../../_components/thread-detail-view';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Page({ params }: ParamsType) {
  const { id } = await params;
  const [session, thread] = await Promise.all([auth(), getThreadById(id)]);
  const currentUserId = session?.user?.id;

  if (!thread) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <ThreadDetailView thread={thread} currentUserId={currentUserId} />
    </div>
  );
}
