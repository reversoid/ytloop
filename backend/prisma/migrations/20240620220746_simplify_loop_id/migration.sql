/*
  Warnings:

  - The primary key for the `loops` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "loops" DROP CONSTRAINT "loops_pkey",
ADD CONSTRAINT "loops_pkey" PRIMARY KEY ("id");
