-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'staff');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BahanBaku" (
    "id" SERIAL NOT NULL,
    "namaKulit" TEXT NOT NULL,
    "bulanTahun" TIMESTAMP(3) NOT NULL,
    "jumlahKulit" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BahanBaku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasilPeramalan" (
    "id" SERIAL NOT NULL,
    "bulanTahun" TIMESTAMP(3) NOT NULL,
    "forecast" DOUBLE PRECISION NOT NULL,
    "error" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HasilPeramalan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
