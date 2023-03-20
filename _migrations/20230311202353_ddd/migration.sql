/*
  Warnings:

  - You are about to drop the column `isDone` on the `Task` table. All the data in the column will be lost.
  - Added the required column `completed` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL
);
INSERT INTO "new_Task" ("description", "id") SELECT "description", "id" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
