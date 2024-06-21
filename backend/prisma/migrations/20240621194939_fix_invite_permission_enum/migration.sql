/*
  Warnings:

  - The values [W] on the enum `invite_permissions` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "invite_permissions_new" AS ENUM ('R', 'RW', 'FULL');
ALTER TABLE "project_invites" ALTER COLUMN "permission" TYPE "invite_permissions_new" USING ("permission"::text::"invite_permissions_new");
ALTER TYPE "invite_permissions" RENAME TO "invite_permissions_old";
ALTER TYPE "invite_permissions_new" RENAME TO "invite_permissions";
DROP TYPE "invite_permissions_old";
COMMIT;
