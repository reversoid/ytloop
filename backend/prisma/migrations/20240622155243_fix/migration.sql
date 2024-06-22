/*
  Warnings:

  - You are about to alter the column `video_speed` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(4,3)`.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "video_speed" SET DATA TYPE DECIMAL(4,3);
