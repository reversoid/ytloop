/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `projects` table. All the data in the column will be lost.
  - Added the required column `permission` to the `project_invites` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "invite_permissions" AS ENUM ('R', 'W', 'RW', 'FULL');

-- AlterTable
ALTER TABLE "project_invites" ADD COLUMN     "permission" "invite_permissions" NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "isPrivate",
ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT false;
