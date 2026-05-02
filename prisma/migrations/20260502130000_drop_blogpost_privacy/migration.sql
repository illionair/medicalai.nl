-- Backfill privacyType from deprecated privacy column where missing
UPDATE "BlogPost" SET "privacyType" = "privacy" WHERE "privacyType" IS NULL AND "privacy" IS NOT NULL;

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "privacy";
