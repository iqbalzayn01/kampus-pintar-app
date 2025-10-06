'use server';

import { ActionResult } from '@/types';
import { threadsSchema } from '@/lib/schema';
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

export async function getAllThreads() {
  try {
    const threads = await prisma.threads.findMany({
      include: {
        author: {
          select: { name: true, image: true },
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

export async function getThreadById(id: string) {
  try {
    const thread = await prisma.threads.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, image: true, id: true } },
        responses: {
          include: {
            author: { select: { name: true, image: true, id: true } },
            votes: true,
          },
          orderBy: [{ isBestAnswer: 'desc' }, { createdAt: 'asc' }],
        },
        votes: true,
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
