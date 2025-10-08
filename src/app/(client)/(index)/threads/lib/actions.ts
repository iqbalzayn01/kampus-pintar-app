'use server';

import { ActionResult } from '@/types';
import { threadsSchema, responseSchema } from '@/lib/schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function createThread(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Harap login terlebih dahulu.' };
  }

  const parsed = threadsSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const { title, content, tags } = parsed.data;
    await prisma.threads.create({
      data: {
        title,
        content,
        tags: tags.split(',').map((tag) => tag.trim().toLowerCase()),
        authorId: session.user.id,
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { points: { increment: 5 } },
    });
  } catch (error) {
    console.error('Error creating thread: ', error);
    return { error: 'Something went wrong, please try again!' };
  }

  revalidatePath('/');
  redirect('/');
}

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
        _count: {
          select: { responses: true, votes: true },
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

export async function updateThread(
  _: unknown,
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Harap login terlebih dahulu.' };
  }

  const thread = await prisma.threads.findUnique({ where: { id: id } });
  if (!thread || thread.authorId !== session.user.id) {
    return { error: 'Anda tidak memiliki izin untuk mengedit diskusi ini.' };
  }

  const parsed = threadsSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const { title, content, tags } = parsed.data;
    await prisma.threads.update({
      where: { id: id },
      data: {
        title,
        content,
        tags: tags.split(',').map((tag) => tag.trim().toLowerCase()),
      },
    });
  } catch (error) {
    console.error(`Error updating thread ${id}: `, error);
    return { error: 'Gagal memperbarui diskusi.' };
  }

  revalidatePath('/');
  revalidatePath(`/threads/${id}`);
  redirect(`/threads/${id}`);
}

export async function deleteThread(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Harap login terlebih dahulu.' };
  }

  try {
    const thread = await prisma.threads.findUnique({
      where: { id: id },
      select: { authorId: true },
    });

    if (thread?.authorId !== session.user.id && session.user.role !== 'ADMIN') {
      return { error: 'Anda tidak memiliki izin untuk menghapus diskusi ini.' };
    }

    await prisma.threads.delete({ where: { id: id } });
  } catch (error) {
    console.error(`Error deleting thread ${id}: `, error);
    return { error: 'Gagal menghapus diskusi.' };
  }

  revalidatePath('/');
  redirect('/');
}

// Response actions
export async function createResponse(
  _: unknown,
  threadId: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Anda harus login untuk memberi tanggapan.' };
  }

  const parsed = responseSchema.safeParse({
    content: formData.get('content'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await prisma.response.create({
      data: {
        content: parsed.data.content,
        authorId: session.user.id,
        threadId: threadId,
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { points: { increment: 10 } },
    });
  } catch (error) {
    console.error('Create Response Error:', error);
    return { error: 'Gagal menyimpan tanggapan.' };
  }

  revalidatePath(`/threads/${threadId}`);
  return { error: null, success: 'Tanggapan berhasil dikirim!' };
}

export async function markAsBestAnswerAction(
  threadId: string,
  responseId: string
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Anda harus login.' };
  }

  try {
    const thread = await prisma.threads.findUnique({
      where: { id: threadId },
      select: { authorId: true },
    });
    if (thread?.authorId !== session.user.id) {
      return {
        error: 'Hanya pembuat diskusi yang bisa menandai jawaban terbaik.',
      };
    }

    const response = await prisma.response.findUnique({
      where: { id: responseId },
      select: { authorId: true },
    });
    if (!response) return { error: 'Tanggapan tidak ditemukan.' };

    await prisma.$transaction([
      prisma.response.updateMany({
        where: { threadId },
        data: { isBestAnswer: false },
      }),
      prisma.response.update({
        where: { id: responseId },
        data: { isBestAnswer: true },
      }),
      prisma.threads.update({
        where: { id: threadId },
        data: { bestResponseId: responseId },
      }),
      prisma.user.update({
        where: { id: response.authorId },
        data: { points: { increment: 25 } },
      }),
    ]);
  } catch (error) {
    return { error: 'Gagal menandai jawaban.' };
  }

  revalidatePath(`/threads/${threadId}`);
  return { error: null, success: 'Jawaban terbaik berhasil ditandai!' };
}

// Vote action
interface HandleVoteParams {
  threadId?: string;
  responseId?: string;
  voteType: 'UPVOTE' | 'DOWNVOTE';
}

export async function handleVoteAction({
  threadId,
  responseId,
  voteType,
}: HandleVoteParams): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Anda harus login untuk memberi suara.' };
  }
  const userId = session.user.id;

  const whereClause = threadId
    ? { userId_threadId: { userId, threadId } }
    : { userId_responseId: { userId, responseId: responseId! } };

  try {
    const existingVote = await prisma.vote.findUnique({ where: whereClause });

    if (existingVote) {
      if (existingVote.type === voteType) {
        await prisma.vote.delete({ where: whereClause });
      } else {
        await prisma.vote.update({
          where: whereClause,
          data: { type: voteType },
        });
      }
    } else {
      await prisma.vote.create({
        data: { type: voteType, userId, threadId, responseId },
      });
    }
  } catch (error) {
    return { error: 'Gagal memproses suara.' };
  }

  revalidatePath(threadId ? `/threads/${threadId}` : '/');
  return { error: null, success: 'Suara berhasil diproses!' };
}
