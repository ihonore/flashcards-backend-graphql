-- CreateTable
CREATE TABLE "Flashcard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "postedById" INTEGER,
    CONSTRAINT "Flashcard_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
