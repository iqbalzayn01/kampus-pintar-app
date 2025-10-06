import { Button } from '@/components/ui/button';
import { Header } from './_components/header';
import { ThreadsCards } from './threads/_components/threads-cards';
import { getAllThreads } from './threads/lib/actions';
import Link from 'next/link';

export default async function Home() {
  const dataThreads = await getAllThreads();
  return (
    <div className="relative font-sans flex flex-col items-center justify-items-center gap-10">
      <Header />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="space-y-4">
          {dataThreads.length > 0 ? (
            <ThreadsCards threads={dataThreads} />
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
      </main>
    </div>
  );
}
