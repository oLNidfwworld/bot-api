/*
  Warnings:

  - You are about to drop the column `userId` on the `GamesOnPlatforms` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GamesOnPlatforms" (
    "gameId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,

    PRIMARY KEY ("gameId", "platformId"),
    CONSTRAINT "GamesOnPlatforms_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GamesOnPlatforms_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GamesOnPlatforms" ("gameId", "platformId") SELECT "gameId", "platformId" FROM "GamesOnPlatforms";
DROP TABLE "GamesOnPlatforms";
ALTER TABLE "new_GamesOnPlatforms" RENAME TO "GamesOnPlatforms";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uid" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL DEFAULT '',
    "avatar_file_id" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "selectedGameId" INTEGER,
    "selectedPlatformId" INTEGER,
    "genderId" INTEGER,
    CONSTRAINT "User_selectedGameId_selectedPlatformId_fkey" FOREIGN KEY ("selectedGameId", "selectedPlatformId") REFERENCES "GamesOnPlatforms" ("gameId", "platformId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatar_file_id", "description", "genderId", "id", "name", "uid") SELECT "avatar_file_id", "description", "genderId", "id", "name", "uid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_selectedGameId_selectedPlatformId_key" ON "User"("selectedGameId", "selectedPlatformId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
