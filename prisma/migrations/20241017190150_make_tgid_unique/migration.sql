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
    "genderId" INTEGER,
    CONSTRAINT "User_selectedGameId_selectedPlatformId_fkey" FOREIGN KEY ("selectedGameId", "selectedPlatformId") REFERENCES "GamesOnPlatforms" ("gameId", "platformId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatar_file_id", "description", "genderId", "id", "name", "selectedGameId", "selectedPlatformId", "uid") SELECT "avatar_file_id", "description", "genderId", "id", "name", "selectedGameId", "selectedPlatformId", "uid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
