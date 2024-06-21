/*
  Warnings:

  - Made the column `user_id` on table `project_invites` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "project_invites" DROP CONSTRAINT "project_invites_user_id_fkey";

-- AlterTable
ALTER TABLE "project_invites" ADD COLUMN     "accepted_at" TIMESTAMPTZ,
ADD COLUMN     "rejected_at" TIMESTAMPTZ,
ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "project_invites" ADD CONSTRAINT "project_invites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
