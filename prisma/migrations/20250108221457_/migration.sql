/*
  Warnings:

  - The primary key for the `UserHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_userId_fkey";

-- AlterTable
ALTER TABLE "UserHistory" DROP CONSTRAINT "UserHistory_pkey",
DROP COLUMN "userId",
ADD COLUMN     "UserId" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ADD CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("UserId");
DROP SEQUENCE "UserHistory_id_seq";

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
