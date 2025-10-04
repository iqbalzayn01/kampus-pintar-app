/*
  Warnings:

  - You are about to drop the column `topicId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `topicId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,threadId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `threadId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Response" DROP CONSTRAINT "Response_topicId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Topic" DROP CONSTRAINT "Topic_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vote" DROP CONSTRAINT "Vote_topicId_fkey";

-- DropIndex
DROP INDEX "public"."Vote_userId_topicId_key";

-- AlterTable
ALTER TABLE "public"."Response" DROP COLUMN "topicId",
ADD COLUMN     "threadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Vote" DROP COLUMN "topicId",
ADD COLUMN     "threadId" TEXT;

-- DropTable
DROP TABLE "public"."Topic";

-- CreateTable
CREATE TABLE "public"."Threads" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "bestResponseId" TEXT,

    CONSTRAINT "Threads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_threadId_key" ON "public"."Vote"("userId", "threadId");

-- AddForeignKey
ALTER TABLE "public"."Threads" ADD CONSTRAINT "Threads_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Response" ADD CONSTRAINT "Response_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "public"."Threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vote" ADD CONSTRAINT "Vote_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "public"."Threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
