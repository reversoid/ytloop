/*
  Warnings:

  - You are about to drop the column `password` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "password",
ADD COLUMN     "code" VARCHAR(16);
