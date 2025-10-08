'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { handleVoteAction } from '../threads/lib/actions';
import { Button } from '@/components/ui/button';

type Vote = { userId: string; type: 'UPVOTE' | 'DOWNVOTE' };
type VoteButtonsProps = {
  itemId: string;
  itemType: 'thread' | 'response';
  initialVotes: Vote[];
  userId?: string;
  path: string;
};

export function VoteButtons({
  itemId,
  itemType,
  initialVotes,
  userId,
  path,
}: VoteButtonsProps) {
  const [isPending, startTransition] = useTransition();

  const handleVote = (voteType: 'UPVOTE' | 'DOWNVOTE') => {
    if (!userId) return toast.error('Anda harus login untuk memberi suara.');

    startTransition(async () => {
      const params =
        itemType === 'thread'
          ? { threadId: itemId, voteType, path }
          : { responseId: itemId, voteType, path };
      await handleVoteAction(params);
    });
  };

  const userVote = initialVotes.find((v) => v.userId === userId)?.type;
  const totalVotes =
    initialVotes.filter((v) => v.type === 'UPVOTE').length -
    initialVotes.filter((v) => v.type === 'DOWNVOTE').length;

  return (
    <div className="flex flex-col items-center gap-1 min-w-[40px] pt-1">
      <Button
        variant={userVote === 'UPVOTE' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleVote('UPVOTE')}
        disabled={isPending}
      >
        <ArrowBigUp className="h-5 w-5" />
      </Button>
      <span className="text-sm font-semibold text-foreground">
        {totalVotes}
      </span>
      <Button
        variant={userVote === 'DOWNVOTE' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleVote('DOWNVOTE')}
        disabled={isPending}
      >
        <ArrowBigDown className="h-5 w-5" />
      </Button>
    </div>
  );
}
