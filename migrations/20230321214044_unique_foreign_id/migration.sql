/*
  Warnings:

  - A unique constraint covering the columns `[foreignId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Result_foreignId_key" ON "Result"("foreignId");
