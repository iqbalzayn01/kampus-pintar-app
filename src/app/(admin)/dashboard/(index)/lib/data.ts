import prisma from '@/lib/prisma';

export async function getAllThreads(page: number = 1, limit: number = 10) {
  try {
    const skipAmount = (page - 1) * limit;

    const [threads, totalThreadsCount] = await prisma.$transaction([
      prisma.threads.findMany({
        skip: skipAmount,
        take: limit,
        include: {
          author: {
            select: { id: true, name: true, image: true },
          },
          votes: true,
          _count: { select: { responses: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.threads.count(),
    ]);

    return {
      threads,
      totalPages: Math.ceil(totalThreadsCount / limit),
    };
  } catch (error) {
    console.error('Error fetching all threads: ', error);
    return { threads: [], totalPages: 0 };
  }
}
