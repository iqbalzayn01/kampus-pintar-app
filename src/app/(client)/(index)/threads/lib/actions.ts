import { ActionResult } from "@/types";
import { threadsSchema } from "@/lib/schema";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function createThread(_: unknown, formData: FormData): Promise<ActionResult> {
    const session = await auth();
    if (!session?.user) {
        return {error: "Harap login terlebih dahulu."};
    }
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;
} 