import { auth } from '@/lib/auth';
import { getAllThreads, getAllUsersPoints } from './lib/data';
import { ThreadsCards } from './_components/threads-cards';
import { GamificationCard } from './_components/gamification-card';

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
    <div className="container mx-auto  flex gap-4 px-5 py-4">
      <ThreadsCards
        threads={threads}
        currentUserId={currentUserId}
        totalPages={totalPages}
      />

      <GamificationCard users={dataUsersPoints} />
    </div>
  );
}
