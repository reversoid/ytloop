/*
  Warnings:

  - You are about to drop the column `code_permission` on the `project_codes` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `project_codes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[project_id]` on the table `project_codes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permission` to the `project_codes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `project_codes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "project_codes" DROP CONSTRAINT "project_codes_projectId_fkey";

-- DropIndex
DROP INDEX "project_codes_projectId_key";

-- AlterTable
ALTER TABLE "project_codes" DROP COLUMN "code_permission",
DROP COLUMN "projectId",
ADD COLUMN     "permission" "project_permissions" NOT NULL,
ADD COLUMN     "project_id" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "project_codes_project_id_key" ON "project_codes"("project_id");

-- AddForeignKey
ALTER TABLE "project_codes" ADD CONSTRAINT "project_codes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
