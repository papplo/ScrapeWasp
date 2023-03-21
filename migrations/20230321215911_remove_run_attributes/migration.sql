/*
  Warnings:

  - You are about to drop the column `runAt` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `runCount` on the `Result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Result" DROP COLUMN "runAt",
DROP COLUMN "runCount";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "runAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "runCount" SERIAL NOT NULL;
