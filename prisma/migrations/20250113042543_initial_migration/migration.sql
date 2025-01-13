/*
  Warnings:

  - Added the required column `name` to the `ProvisioningServiceAPICall` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProvisioningServiceAPICall" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "provisioningServiceId" TEXT NOT NULL,
    "apiEndpoint" TEXT NOT NULL,
    "requestMethod" TEXT NOT NULL,
    "requestHeaders" TEXT NOT NULL,
    "requestBody" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "ProvisioningServiceAPICall_provisioningServiceId_fkey" FOREIGN KEY ("provisioningServiceId") REFERENCES "ProvisioningService" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProvisioningServiceAPICall" ("apiEndpoint", "createdAt", "deletedAt", "id", "provisioningServiceId", "requestBody", "requestHeaders", "requestMethod", "updatedAt") SELECT "apiEndpoint", "createdAt", "deletedAt", "id", "provisioningServiceId", "requestBody", "requestHeaders", "requestMethod", "updatedAt" FROM "ProvisioningServiceAPICall";
DROP TABLE "ProvisioningServiceAPICall";
ALTER TABLE "new_ProvisioningServiceAPICall" RENAME TO "ProvisioningServiceAPICall";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
