-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessPolicyApproval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "accessPolicyId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    CONSTRAINT "AccessPolicyApproval_accessPolicyId_fkey" FOREIGN KEY ("accessPolicyId") REFERENCES "AccessPolicy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AccessPolicyApproval" ("accessPolicyId", "createdAt", "deletedAt", "id", "priority", "updatedAt") SELECT "accessPolicyId", "createdAt", "deletedAt", "id", "priority", "updatedAt" FROM "AccessPolicyApproval";
DROP TABLE "AccessPolicyApproval";
ALTER TABLE "new_AccessPolicyApproval" RENAME TO "AccessPolicyApproval";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
