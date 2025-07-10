-- CreateEnum
CREATE TYPE "FahndungType" AS ENUM ('PERSON', 'VEHICLE', 'OBJECT');

-- CreateTable
CREATE TABLE "Fahndung" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NEW',
    "type" "FahndungType" NOT NULL,
    "reward" DOUBLE PRECISION,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Fahndung_pkey" PRIMARY KEY ("id")
);

