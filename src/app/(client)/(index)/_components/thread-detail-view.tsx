'use client';

import { MessageSquare, Clock } from 'lucide-react';
import { ThreadDetailType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ResponseCard } from './response-card';
import { ResponseForm } from './response-form';
import { VoteButtons } from './vote-buttons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type ThreadDetailViewProps = {
  thread: ThreadDetailType;
  currentUserId?: string;
};

export function ThreadDetailView({
  thread,
  currentUserId,
}: ThreadDetailViewProps) {
  const pathname = usePathname();
  const isAuthor = currentUserId === thread.author.id;

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/"
        className="text-sm text-primary hover:underline mb-6 inline-block"
      >
        ← Kembali ke diskusi
      </Link>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <VoteButtons
              itemId={thread.id}
              itemType="thread"
              initialVotes={thread.votes}
              userId={currentUserId}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{thread.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {thread.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed whitespace-pre-wrap">
                {thread.content}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={thread.author.image ?? undefined} />
                    <AvatarFallback>{thread.author.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">
                    {thread.author.name}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(thread.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{thread.responses.length} balasan</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">
          {thread.responses.length} Tanggapan
        </h2>
        <div className="space-y-4">
          {thread.responses.map((response) => (
            <ResponseCard
              key={response.id}
              response={response}
              userId={currentUserId}
              isThreadAuthor={isAuthor}
              isBestAnswer={thread.bestResponseId === response.id}
              // path={pathname}
            />
          ))}
        </div>
      </div>

      <Separator className="my-8" />
      <ResponseForm threadId={thread.id} />
    </main>
  );
}
