/*
  Warnings:

  - You are about to drop the column `tg_avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tg_description` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tg_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tg_uid` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Gender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Gender_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GamesOnPlatforms" (
    "gameId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("gameId", "platformId"),
    CONSTRAINT "GamesOnPlatforms_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GamesOnPlatforms_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GamesOnPlatforms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GamesOnPlatforms" ("gameId", "platformId") SELECT "gameId", "platformId" FROM "GamesOnPlatforms";
DROP TABLE "GamesOnPlatforms";
ALTER TABLE "new_GamesOnPlatforms" RENAME TO "GamesOnPlatforms";
CREATE UNIQUE INDEX "GamesOnPlatforms_userId_key" ON "GamesOnPlatforms"("userId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL DEFAULT '',
    "avatar_file_id" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "genderId" INTEGER
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Gender_userId_key" ON "Gender"("userId");
