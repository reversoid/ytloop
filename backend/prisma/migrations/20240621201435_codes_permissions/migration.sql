/*
  Warnings:

  - You are about to drop the column `code` on the `projects` table. All the data in the column will be lost.
  - Changed the type of `permission` on the `project_invites` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "project_permissions" AS ENUM ('R', 'RW', 'FULL');

-- AlterTable
ALTER TABLE "project_invites" DROP COLUMN "permission",
ADD COLUMN     "permission" "project_permissions" NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "code";

-- DropEnum
DROP TYPE "invite_permissions";

-- CreateTable
CREATE TABLE "project_codes" (
    "code" VARCHAR(16) NOT NULL,
    "code_permission" "project_permissions" NOT NULL,
    "projectId" VARCHAR(10) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "project_codes_projectId_key" ON "project_codes"("projectId");

-- AddForeignKey
ALTER TABLE "project_codes" ADD CONSTRAINT "project_codes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
