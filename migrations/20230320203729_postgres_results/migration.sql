-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "query" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "runAt" TIMESTAMP(3) NOT NULL,
    "runCount" INTEGER NOT NULL DEFAULT 0,
    "rawDom" TEXT NOT NULL,
    "parsedQuery" TEXT NOT NULL,
    "parsedTitle" TEXT NOT NULL,
    "parsedPrice" TEXT NOT NULL,
    "parsedDescription" TEXT NOT NULL,
    "parsedImage" TEXT NOT NULL,
    "parsedLink" TEXT NOT NULL,
    "parsedCategory" TEXT NOT NULL,
    "taskId" INTEGER,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
