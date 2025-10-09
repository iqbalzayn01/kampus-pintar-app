import { auth } from '@/lib/auth';
import { getAllThreads, getAllUsersPoints } from './lib/data';
import { ThreadsCards } from './_components/threads-cards';
import { GamificationCard } from './_components/gamification-card';

export default async function Home() {
  const session = await auth();
  const dataThreads = await getAllThreads();
  const dataUsersPoints = await getAllUsersPoints();
  const currentUserId = session?.user?.id;

  return (
    <div className="container mx-auto px-5 flex gap-4">
      <ThreadsCards threads={dataThreads} currentUserId={currentUserId} />

      <GamificationCard users={dataUsersPoints} />
    </div>
  );
}
