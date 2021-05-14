-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "ville" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "codePostal" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "reset_password_token" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "promo" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Commands" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "products" TEXT NOT NULL,
    "authorId" INTEGER,
    FOREIGN KEY ("authorId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "facebook" TEXT NOT NULL,
    "Instagram" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "about" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoriesToProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users.username_unique" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToProducts_AB_unique" ON "_CategoriesToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToProducts_B_index" ON "_CategoriesToProducts"("B");
