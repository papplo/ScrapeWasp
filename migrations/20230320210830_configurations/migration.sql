/*
  Warnings:

  - You are about to drop the column `value` on the `Configuration` table. All the data in the column will be lost.
  - Added the required column `baseHref` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryPath` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noResultsPath` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pagingPath` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `searchPath` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "value",
ADD COLUMN     "baseHref" TEXT NOT NULL,
ADD COLUMN     "categoryPath" TEXT NOT NULL,
ADD COLUMN     "noResultsPath" TEXT NOT NULL,
ADD COLUMN     "pagingPath" TEXT NOT NULL,
ADD COLUMN     "searchPath" TEXT NOT NULL;
