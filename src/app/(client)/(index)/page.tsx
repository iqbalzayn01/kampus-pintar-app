import React from 'react';

import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { ThreadsCards } from './_components/threads-cards';
import { GamificationCard } from './_components/gamification-card';
import { getAllThreads, getAllUsersPoints } from './lib/data';
import { auth } from '@/lib/auth';

type PageProps = {
  searchParams: { page?: string } | Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const [session, { threads, totalPages }, dataUsersPoints] = await Promise.all(
    [auth(), getAllThreads(currentPage), getAllUsersPoints()]
  );

  const currentUserId = session?.user?.id;

  return (
    <div className="container mx-auto flex gap-4 px-5 py-4">
      <div className="flex-1 flex flex-col gap-4">
        <div className="relative flex w-full items-center ">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search discussions..."
            className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <ThreadsCards
          threads={threads}
          currentUserId={currentUserId}
          totalPages={totalPages}
        />
      </div>

      <GamificationCard users={dataUsersPoints} className="hidden lg:inline" />
    </div>
  );
}
