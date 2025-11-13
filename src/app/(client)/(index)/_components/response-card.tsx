'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { CheckCircle2, Clock } from 'lucide-react';

import { ResponseType } from '@/types';
// import { markAsBestAnswerAction } from '@/lib/actions/responses.actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { VoteButtons } from './vote-buttons';

type ResponseCardProps = {
  response: ResponseType;
  userId?: string;
  isThreadAuthor: boolean;
  isBestAnswer: boolean;
};

export function ResponseCard({
  response,
  userId,
  isThreadAuthor,
  isBestAnswer,
}: ResponseCardProps) {
  const [isPending, startTransition] = useTransition();

  // const handleMarkAsBest = () => {
  //   startTransition(async () => {
  //     const result = await markAsBestAnswerAction(
  //       response.threadId,
  //       response.id
  //     );
  //     if (result?.error) toast.error(result.error);
  //     if (result?.success) toast.success(result.success);
  //   });
  // };

  return (
    <div className="flex items-start gap-4">
      {/* <VoteButtons
        itemId={response.id}
        itemType="response"
        initialVotes={response.votes}
        userId={userId}
      /> */}
      <Card
        className={`flex-1 ${isBestAnswer ? 'border-green-500 border-2' : ''}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={response.author.image ?? undefined} />
                <AvatarFallback>{response.author.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <span className="font-semibold text-sm">
                  {response.author.name}
                </span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {new Date(response.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
            {isBestAnswer && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 border-green-300"
              >
                <CheckCircle2 className="h-3 w-3 mr-1" /> Jawaban Terbaik
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4 leading-relaxed  break-all whitespace-pre-wrap">
            {response.content}
          </p>
          {/* {isThreadAuthor && !isBestAnswer && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAsBest}
              disabled={isPending}
              className="text-green-600 border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {isPending ? 'Menandai...' : 'Tandai sebagai Jawaban Terbaik'}
            </Button>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
}
