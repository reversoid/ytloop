/*
  Warnings:

  - Made the column `video_speed` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "video_speed" SET NOT NULL,
ALTER COLUMN "video_speed" SET DATA TYPE DECIMAL(3,2);
