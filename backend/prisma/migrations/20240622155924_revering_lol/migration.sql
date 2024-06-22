/*
  Warnings:

  - You are about to alter the column `video_speed` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,5)` to `Decimal(3,2)`.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "video_speed" SET DATA TYPE DECIMAL(3,2);
