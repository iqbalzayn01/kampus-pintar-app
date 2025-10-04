import { ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TopicCardProps {
  id: string;
  title: string;
  authorName: string;
  authorImage?: string;
  tags: string[];
  voteCount: number;
  responseCount: number;
  createdAt?: string;
}

export function TopicCard({
  id,
  title,
  authorName,
  authorImage,
  tags,
  voteCount,
  responseCount,
  createdAt,
}: TopicCardProps) {
  const initials = authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link href={`/topics/${id}`}>
      <Card className="p-6 hover:bg-card-hover transition-colors cursor-pointer border-border">
        <div className="flex gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center gap-1 min-w-[40px]">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-secondary"
            >
              <ArrowBigUp className="h-5 w-5" />
            </Button>
            <span className="text-sm font-semibold text-foreground">
              {voteCount}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-secondary"
            >
              <ArrowBigDown className="h-5 w-5" />
            </Button>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-3 hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-tag-bg text-tag-text hover:bg-tag-bg/80 font-medium px-3 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={authorImage} alt={authorName} />
                  <AvatarFallback className="text-xs bg-secondary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hover:text-primary transition-colors">
                  {authorName}
                </span>
              </div>

              <span>•</span>
              <span>timeAgo</span>

              <div className="flex items-center gap-1.5 ml-auto">
                <MessageSquare className="h-4 w-4" />
                <span className="font-medium">
                  {responseCount}{' '}
                  {responseCount === 1 ? 'response' : 'responses'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
