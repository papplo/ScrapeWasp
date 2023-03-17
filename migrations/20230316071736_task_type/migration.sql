-- CreateTable
CREATE TABLE "Configuration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "typeId" INTEGER,
    CONSTRAINT "Configuration_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TaskType" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
