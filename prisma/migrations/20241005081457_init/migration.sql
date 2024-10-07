-- CreateTable
CREATE TABLE "Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "g_name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tg_uid" INTEGER NOT NULL,
    "tg_name" TEXT NOT NULL,
    "tg_description" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("id", "tg_name", "tg_uid") SELECT "id", "tg_name", "tg_uid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
