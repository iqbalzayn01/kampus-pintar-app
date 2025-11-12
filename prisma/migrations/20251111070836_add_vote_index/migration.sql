/*
  Warnings:

  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Vote" DROP CONSTRAINT "Vote_responseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vote" DROP CONSTRAINT "Vote_threadId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- DropTable
DROP TABLE "public"."Vote";

-- CreateTable
CREATE TABLE "public"."votes" (
    "id" TEXT NOT NULL,
    "type" "public"."VoteType" NOT NULL,
    "userId" TEXT NOT NULL,
    "threadId" TEXT,
    "responseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_vote_threadId" ON "public"."votes"("threadId");

-- CreateIndex
CREATE INDEX "idx_vote_responseId" ON "public"."votes"("responseId");

-- CreateIndex
CREATE INDEX "idx_vote_userId" ON "public"."votes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_threadId_key" ON "public"."votes"("userId", "threadId");

-- CreateIndex
CREATE UNIQUE INDEX "votes_userId_responseId_key" ON "public"."votes"("userId", "responseId");

-- AddForeignKey
ALTER TABLE "public"."votes" ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."votes" ADD CONSTRAINT "votes_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "public"."Threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."votes" ADD CONSTRAINT "votes_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "public"."Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;
