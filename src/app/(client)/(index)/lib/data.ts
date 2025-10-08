import prisma from '@/lib/prisma';

export async function getAllThreads(page: number = 1, limit: number = 10) {
  try {
    const skipAmount = (page - 1) * limit;

    const threads = await prisma.threads.findMany({
      skip: skipAmount,
      take: limit,
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
        votes: true,
        _count: {
          select: { responses: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return threads;
  } catch (error) {
    console.error('Error fetching all threads:', error);
    return [];
  }
}

export async function getThreadById(
  id: string,
  responsePage: number = 1,
  responsesPerPage: number = 10
) {
  try {
    const skipAmount = (responsePage - 1) * responsesPerPage;
    const thread = await prisma.threads.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        tags: true,
        authorId: true,
        author: {
          select: { id: true, name: true, image: true },
        },
        bestResponseId: true,
        votes: true,
        _count: {
          select: { responses: true },
        },

        responses: {
          skip: skipAmount,
          take: responsesPerPage,
          select: {
            id: true,
            content: true,
            isBestAnswer: true,
            threadId: true,
            createdAt: true,
            updatedAt: true,
            author: {
              select: { id: true, name: true, image: true },
            },
            votes: true,
          },
          orderBy: [{ isBestAnswer: 'desc' }, { createdAt: 'asc' }],
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return thread;
  } catch (error) {
    console.error(`Error fetching thread with ID ${id}:`, error);
    return null;
  }
}

export async function getAllThreadsByUserId(
  userId: string,
  page: number = 1,
  limit: number = 10
) {
  const skipAmount = (page - 1) * limit;

  try {
    const threads = await prisma.threads.findMany({
      where: { authorId: userId },
      skip: skipAmount,
      take: limit,
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
        votes: true,
        _count: {
          select: { responses: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return threads;
  } catch (error) {
    console.error('Error fetching threads by user ID:', error);
    return [];
  }
}
