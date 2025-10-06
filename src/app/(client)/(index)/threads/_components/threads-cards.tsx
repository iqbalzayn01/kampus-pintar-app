import { ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TypeThreads } from '@/types';
import Link from 'next/link';

export function ThreadsCards({ threads }: { threads: TypeThreads[] }) {
  return (
    <div className="space-y-4">
      {threads.map((thread) => {
        const initials = (thread.author.name ?? 'A')
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        return (
          <Card
            key={thread.id}
            className="p-6 hover:bg-card-hover transition-colors border-border"
          >
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1 min-w-[40px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-secondary"
                >
                  <ArrowBigUp className="h-5 w-5" />
                </Button>
                <span className="text-sm font-semibold text-foreground">
                  {thread._count.votes}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-secondary"
                >
                  <ArrowBigDown className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/threads/${thread.id}`}>
                  <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary transition-colors">
                    {thread.title}
                  </h3>
                </Link>

                <div className="flex flex-wrap gap-2 mb-4">
                  {thread.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-tag-bg text-tag-text hover:bg-tag-bg/80 font-medium px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={thread.author.image ?? undefined}
                        alt={thread.author.name ?? 'Author'}
                      />
                      <AvatarFallback className="text-xs bg-secondary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hover:text-primary transition-colors">
                      {thread.author.name}
                    </span>
                  </div>

                  <span>•</span>
                  <span>{new Date(thread.createdAt).toLocaleDateString()}</span>

                  <div className="flex items-center gap-1.5 ml-auto">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">
                      {thread._count.responses}{' '}
                      {thread._count.responses === 1 ? 'response' : 'responses'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
