export type ActionResult = {
  error: string | null;
  success?: string;
};

export type ParamsType = {
  params: {
    id: string;
  };
};

export type ThreadsType = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  _count: {
    responses: number;
  };
  votes: VotesType[];
  createdAt: Date;
  updatedAt: Date;
};

export type ResponseType = {
  id: string;
  content: string;
  isBestAnswer: boolean;
  threadId: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  votes: VotesType[];
  createdAt: Date;
  updatedAt: Date;
};

export type VoteType = 'UPVOTE' | 'DOWNVOTE';

export type VotesType = {
  id: string;
  type: VoteType;
  userId: string;
  threadId?: string | null;
  responseId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ThreadDetailType = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  authorId: string;
  bestResponseId: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  responses: ResponseType[];
  votes: VotesType[];
  _count: {
    responses: number;
  };
};
