-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LikedList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "isLiked" BOOLEAN NOT NULL,
    "userLiked" INTEGER NOT NULL,
    CONSTRAINT "LikedList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LikedList_userLiked_fkey" FOREIGN KEY ("userLiked") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LikedList" ("id", "isLiked", "userId", "userLiked") SELECT "id", "isLiked", "userId", "userLiked" FROM "LikedList";
DROP TABLE "LikedList";
ALTER TABLE "new_LikedList" RENAME TO "LikedList";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
