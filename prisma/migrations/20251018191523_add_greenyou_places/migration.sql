/*
  Warnings:

  - You are about to drop the column `actions` on the `referencement_requests` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `referencement_requests` table. All the data in the column will be lost.
  - You are about to drop the column `ecoLabel` on the `referencement_requests` table. All the data in the column will be lost.
  - You are about to drop the column `energieRenouvelable` on the `referencement_requests` table. All the data in the column will be lost.
  - You are about to drop the column `engagementLocal` on the `referencement_requests` table. All the data in the column will be lost.
  - You are about to drop the column `localisation` on the `referencement_requests` table. All the data in the column will be lost.
  - You are about to drop the column `preuves` on the `referencement_requests` table. All the data in the column will be lost.
  - You are about to drop the column `triSelectif` on the `referencement_requests` table. All the data in the column will be lost.
  - Added the required column `adresse` to the `referencement_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codePostal` to the `referencement_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `referencement_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `referencement_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ville` to the `referencement_requests` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "greenyou_places" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT,
    "adresse" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "pays" TEXT NOT NULL DEFAULT 'France',
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "description" TEXT,
    "pratiquesEco" TEXT,
    "labelsCertifications" TEXT,
    "siteWeb" TEXT,
    "reseauxSociaux" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "referencementId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_referencement_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "pays" TEXT NOT NULL DEFAULT 'France',
    "latitude" REAL,
    "longitude" REAL,
    "description" TEXT,
    "pratiquesEco" TEXT,
    "labelsCertifications" TEXT,
    "siteWeb" TEXT,
    "reseauxSociaux" TEXT,
    "status" TEXT NOT NULL DEFAULT 'EN_ATTENTE',
    "greenYouPlaceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_referencement_requests" ("createdAt", "description", "id", "nom", "status", "type", "updatedAt") SELECT "createdAt", "description", "id", "nom", "status", "type", "updatedAt" FROM "referencement_requests";
DROP TABLE "referencement_requests";
ALTER TABLE "new_referencement_requests" RENAME TO "referencement_requests";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "greenyou_places_referencementId_key" ON "greenyou_places"("referencementId");
