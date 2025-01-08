/*
  Warnings:

  - Added the required column `month` to the `BahanBaku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BahanBaku" ADD COLUMN     "month" TEXT NOT NULL;
