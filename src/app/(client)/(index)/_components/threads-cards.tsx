'use client';

import {
  MessageSquare,
  MoreHorizontal,
  Edit2,
  Share2,
  Trash2,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { VoteButtons } from './vote-buttons';
import { ThreadsType } from '@/types';
import { usePathname } from 'next/navigation';
import { formatTimeAgo } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ThreadsCards({
  threads,
  currentUserId,
}: {
  threads: ThreadsType[];
  currentUserId?: string;
}) {
  const pathname = usePathname();

  if (!threads || threads.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-10">
        Belum ada thread. Ayo mulai diskusi baru! 🚀
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {threads.map((thread) => {
        const initials = (thread.author.name ?? 'A')
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        return (
          <Card key={thread.id}>
            <CardContent className="flex gap-4">
              <VoteButtons
                itemId={thread.id}
                itemType="thread"
                initialVotes={thread.votes}
                userId={currentUserId}
                path={pathname}
              />

              <div className="flex flex-col flex-1 gap-2">
                <Link
                  href={`/threads/${thread.id}`}
                  className="text-xl font-semibold hover:underline"
                >
                  <h2>{thread.title}</h2>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {thread.content}
                </p>

                <div className="flex flex-wrap gap-2">
                  {thread.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-lg">
                  <DropdownMenuItem>
                    <Share2 className="size-4" />
                    Share
                  </DropdownMenuItem>
                  {thread.author.id === currentUserId && (
                    <>
                      <DropdownMenuItem>
                        <Edit2 className="size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="size-4 text-destructive" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>

            <CardFooter className="flex justify-between items-center py-3">
              <div className="flex items-center gap-2 text-base">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={thread.author.image ?? undefined} />
                  <AvatarFallback className="text-[10px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span>{thread.author.name}</span>
                <span className="text-muted-foreground/60">•</span>
                <span>{formatTimeAgo(new Date(thread.createdAt))}</span>
              </div>

              <Link
                href={`/threads/${thread.id}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">
                  {thread._count.responses}{' '}
                  {thread._count.responses === 1 ? 'Comment' : 'Comments'}
                </span>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
