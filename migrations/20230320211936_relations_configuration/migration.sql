/*
  Warnings:

  - You are about to drop the column `typeId` on the `Configuration` table. All the data in the column will be lost.
  - Added the required column `configurationId` to the `TaskType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_typeId_fkey";

-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "typeId";

-- AlterTable
ALTER TABLE "TaskType" ADD COLUMN     "configurationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskType" ADD CONSTRAINT "TaskType_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
