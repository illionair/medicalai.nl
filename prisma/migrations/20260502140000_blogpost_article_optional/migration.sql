-- DropForeignKey to allow nullable articleId
ALTER TABLE "BlogPost" DROP CONSTRAINT IF EXISTS "BlogPost_articleId_fkey";

-- Null out articleId values that point to a manual placeholder (no real Article row)
UPDATE "BlogPost" SET "articleId" = NULL WHERE "articleId" LIKE 'manual-%';

-- AlterTable
ALTER TABLE "BlogPost" ALTER COLUMN "articleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
