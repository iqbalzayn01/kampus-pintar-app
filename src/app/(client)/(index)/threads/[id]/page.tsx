'use client';

import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

// Mock data
const mockTopic = {
  id: '1',
  title:
    'What are the best practices for implementing quantum error correction in NISQ devices?',
  content:
    "I've been researching quantum error correction codes and their applicability to current Noisy Intermediate-Scale Quantum (NISQ) devices. While theoretically sound, I'm curious about the practical challenges researchers face when implementing these on actual hardware. What are the trade-offs between different error correction schemes, and which ones show the most promise for near-term applications?",
  authorName: 'Dr. Sarah Chen',
  authorImage: '',
  authorId: 'author-1',
  tags: ['Quantum Computing', 'Error Correction', 'NISQ'],
  voteCount: 42,
  responseCount: 8,
  createdAt: '2025-01-15T10:30:00Z',
};

const mockResponses = [
  {
    id: 'r1',
    content:
      'Great question! Surface codes are currently the most promising for NISQ devices due to their relatively high threshold and local connectivity requirements. However, the overhead is significant - you need many physical qubits per logical qubit.',
    authorName: 'Prof. James Wilson',
    authorImage: '',
    authorId: 'author-2',
    voteCount: 28,
    createdAt: '2025-01-15T14:20:00Z',
    isBestAnswer: true,
  },
  {
    id: 'r2',
    content:
      "I'd add that recent work on bosonic codes shows promise for reducing overhead. The cat codes and Gottesman-Kitaev-Preskill (GKP) codes are particularly interesting for superconducting circuits.",
    authorName: 'Dr. Maria Rodriguez',
    authorImage: '',
    authorId: 'author-3',
    voteCount: 15,
    createdAt: '2025-01-15T16:45:00Z',
    isBestAnswer: false,
  },
  {
    id: 'r3',
    content:
      "Don't forget about the resource state approach! Magic state distillation combined with Steane or Knill codes can be more practical for current hardware constraints.",
    authorName: 'Alex Kumar',
    authorImage: '',
    authorId: 'author-4',
    voteCount: 12,
    createdAt: '2025-01-16T09:10:00Z',
    isBestAnswer: false,
  },
];

const VoteButton = ({
  count,
  type,
}: {
  count: number;
  type: 'up' | 'down';
}) => {
  const [votes, setVotes] = useState(count);
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);

  const handleVote = () => {
    if (voted === type) {
      setVoted(null);
      setVotes(type === 'up' ? votes - 1 : votes + 1);
    } else {
      if (voted) {
        setVotes(type === 'up' ? votes + 2 : votes - 2);
      } else {
        setVotes(type === 'up' ? votes + 1 : votes - 1);
      }
      setVoted(type);
    }
  };

  const Icon = type === 'up' ? ArrowBigUp : ArrowBigDown;
  const isActive = voted === type;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleVote}
      className={`p-2 ${
        isActive ? 'text-primary' : 'text-muted-foreground'
      } hover:text-primary`}
    >
      <Icon className={`h-6 w-6 ${isActive ? 'fill-current' : ''}`} />
    </Button>
  );
};

const ResponseCard = ({
  response,
  isAuthor,
}: {
  response: (typeof mockResponses)[0];
  isAuthor: boolean;
}) => {
  const [isBest, setIsBest] = useState(response.isBestAnswer);

  return (
    <Card className={`${isBest ? 'border-green-500 border-2' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={response.authorImage} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {response.authorName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                {response.authorName}
              </span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>time</span>
              </div>
            </div>
          </div>
          {isBest && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 border-green-300"
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Best Answer
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4 leading-relaxed">
          {response.content}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <VoteButton count={response.voteCount} type="up" />
            <span className="text-sm font-medium min-w-[2rem] text-center">
              {response.voteCount}
            </span>
            <VoteButton count={response.voteCount} type="down" />
          </div>
          {isAuthor && !isBest && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBest(true)}
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark as Best Answer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function TopicDetail() {
  const { id } = useParams();
  const [newResponse, setNewResponse] = useState('');
  const currentUserId = 'author-1'; // Mock current user

  const handleSubmitResponse = () => {
    console.log('Submitting response:', newResponse);
    setNewResponse('');
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back to discussions */}
        <Link
          href="/"
          className="text-sm text-primary hover:underline mb-6 inline-block"
        >
          ← Back to discussions
        </Link>

        {/* Main Topic */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              {/* Vote Section */}
              <div className="flex flex-col items-center gap-1">
                <VoteButton count={mockTopic.voteCount} type="up" />
                <span className="text-lg font-bold">{mockTopic.voteCount}</span>
                <VoteButton count={mockTopic.voteCount} type="down" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{mockTopic.title}</h1>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mockTopic.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-tag-bg text-tag-text"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed">
                  {mockTopic.content}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockTopic.authorImage} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {mockTopic.authorName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {mockTopic.authorName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>time</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{mockResponses.length} responses</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Responses Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {mockResponses.length} Responses
          </h2>
          <div className="space-y-4">
            {mockResponses.map((response) => (
              <ResponseCard
                key={response.id}
                response={response}
                isAuthor={currentUserId === mockTopic.authorId}
              />
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {/* New Response Form */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Your Response</h3>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your knowledge and insights..."
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              className="mb-4 min-h-[150px]"
            />
            <Button
              onClick={handleSubmitResponse}
              disabled={!newResponse.trim()}
            >
              Submit Response
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
