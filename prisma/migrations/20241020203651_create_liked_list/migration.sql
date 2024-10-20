/*
  Warnings:

  - You are about to drop the `Gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `genderId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Gender_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Gender";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "LikedList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isLiked" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "userLiked" INTEGER NOT NULL,
    CONSTRAINT "LikedList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "avatar_file_id" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "selectedGameId" INTEGER,
    "selectedPlatformId" INTEGER,
    CONSTRAINT "User_selectedGameId_selectedPlatformId_fkey" FOREIGN KEY ("selectedGameId", "selectedPlatformId") REFERENCES "GamesOnPlatforms" ("gameId", "platformId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatar_file_id", "description", "id", "name", "selectedGameId", "selectedPlatformId", "uid") SELECT "avatar_file_id", "description", "id", "name", "selectedGameId", "selectedPlatformId", "uid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "LikedList_userLiked_key" ON "LikedList"("userLiked");
