import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ThreadsCards } from './_components/threads-cards';
import { getAllThreads } from './lib/data';
import Link from 'next/link';

export default async function Home() {
  const dataThreads = await getAllThreads();
  const session = await auth();
  const currentUserId = session?.user?.id;

  return (
    <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div className="space-y-4">
        {dataThreads.length > 0 ? (
          <ThreadsCards threads={dataThreads} currentUserId={currentUserId} />
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
      </div>
    </div>
  );
}
