'use client';

import { useTransition, useOptimistic } from 'react';
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

  const initialState = {
    votes: initialVotes,
    userVote: initialVotes.find((v) => v.userId === userId)?.type,
    totalVotes:
      initialVotes.filter((v) => v.type === 'UPVOTE').length -
      initialVotes.filter((v) => v.type === 'DOWNVOTE').length,
  };

  const [optimisticState, setOptimisticVote] = useOptimistic(
    initialState,
    (currentState, newVoteType: 'UPVOTE' | 'DOWNVOTE'): typeof initialState => {
      const { votes, userVote, totalVotes } = currentState;

      if (userVote === newVoteType) {
        return {
          votes: votes.filter((v) => v.userId !== userId),
          userVote: undefined,
          totalVotes:
            newVoteType === 'UPVOTE' ? totalVotes - 1 : totalVotes + 1,
        };
      }

      if (userVote && userVote !== newVoteType) {
        return {
          votes: [
            ...votes.filter((v) => v.userId !== userId),
            { userId: userId!, type: newVoteType },
          ],
          userVote: newVoteType,
          totalVotes:
            newVoteType === 'UPVOTE' ? totalVotes + 2 : totalVotes - 2,
        };
      }

      return {
        votes: [...votes, { userId: userId!, type: newVoteType }],
        userVote: newVoteType,
        totalVotes: newVoteType === 'UPVOTE' ? totalVotes + 1 : totalVotes - 1,
      };
    }
  );

  const handleVote = (voteType: 'UPVOTE' | 'DOWNVOTE') => {
    if (!userId) return toast.error('Anda harus login untuk memberi suara.');

    startTransition(async () => {
      setOptimisticVote(voteType);

      const params =
        itemType === 'thread'
          ? { threadId: itemId, voteType, path }
          : { responseId: itemId, voteType, path };

      try {
        await handleVoteAction(params);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Vote gagal');
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-1 min-w-[40px] pt-1">
      <Button
        variant={optimisticState.userVote === 'UPVOTE' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleVote('UPVOTE')}
        disabled={isPending || !userId}
      >
        <ArrowBigUp className="h-5 w-5" />
      </Button>
      <span className="text-sm font-semibold text-foreground">
        {optimisticState.totalVotes}
      </span>
      <Button
        variant={optimisticState.userVote === 'DOWNVOTE' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleVote('DOWNVOTE')}
        disabled={isPending || !userId}
      >
        <ArrowBigDown className="h-5 w-5" />
      </Button>
    </div>
  );
}
