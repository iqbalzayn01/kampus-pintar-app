export type ActionResult = {
  error: string | null;
  success?: string;
};

export type TypeId = {
  id: string;
};

export type TypeParams = {
  params: Promise<TypeId>;
};

export type TypeThreads = {
  id: string;
  title: string;
  tags: string[];
  createdAt: Date;
  author: {
    name: string | null;
    image: string | null;
  };
  _count: {
    responses: number;
    votes: number;
  };
};
