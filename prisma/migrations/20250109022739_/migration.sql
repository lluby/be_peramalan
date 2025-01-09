/*
  Warnings:

  - You are about to drop the column `description` on the `UserHistory` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `UserHistory` table. All the data in the column will be lost.
  - Added the required column `action` to the `UserHistory` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `UserHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "action" AS ENUM ('LOGIN', 'CREATE', 'UPDATE', 'DELETE');

-- DropForeignKey
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_userId_fkey";

-- DropIndex
DROP INDEX "UserHistory_userId_idx";

-- AlterTable
ALTER TABLE "UserHistory" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "action" "action" NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
