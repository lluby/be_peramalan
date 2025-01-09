/*
  Warnings:

  - The primary key for the `UserHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `UserId` on the `UserHistory` table. All the data in the column will be lost.
  - You are about to drop the column `action` on the `UserHistory` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `UserHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_id_fkey";

-- AlterTable
CREATE SEQUENCE userhistory_id_seq;
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_pkey",
DROP COLUMN "UserId",
DROP COLUMN "action",
DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'No description available',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'Default Title',
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "id" SET DEFAULT nextval('userhistory_id_seq'),
ADD CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE userhistory_id_seq OWNED BY "UserHistory"."id";

-- CreateIndex
CREATE INDEX "UserHistory_userId_idx" ON "UserHistory"("userId");

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
