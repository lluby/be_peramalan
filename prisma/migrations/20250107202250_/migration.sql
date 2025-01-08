/*
  Warnings:

  - You are about to drop the column `bulanTahun` on the `BahanBaku` table. All the data in the column will be lost.
  - You are about to drop the column `jumlahKulit` on the `BahanBaku` table. All the data in the column will be lost.
  - You are about to drop the column `namaKulit` on the `BahanBaku` table. All the data in the column will be lost.
  - You are about to drop the column `bulanTahun` on the `HasilPeramalan` table. All the data in the column will be lost.
  - You are about to drop the column `error` on the `HasilPeramalan` table. All the data in the column will be lost.
  - You are about to drop the column `forecast` on the `HasilPeramalan` table. All the data in the column will be lost.
  - Added the required column `alpha` to the `BahanBaku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BahanBaku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `BahanBaku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BahanBaku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alpha` to the `HasilPeramalan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forecastDate` to the `HasilPeramalan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forecastValue` to the `HasilPeramalan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawMaterialId` to the `HasilPeramalan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BahanBaku" DROP COLUMN "bulanTahun",
DROP COLUMN "jumlahKulit",
DROP COLUMN "namaKulit",
ADD COLUMN     "alpha" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "HasilPeramalan" DROP COLUMN "bulanTahun",
DROP COLUMN "error",
DROP COLUMN "forecast",
ADD COLUMN     "alpha" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "forecastDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "forecastValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rawMaterialId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "HasilPeramalan" ADD CONSTRAINT "HasilPeramalan_rawMaterialId_fkey" FOREIGN KEY ("rawMaterialId") REFERENCES "BahanBaku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
