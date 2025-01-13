-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessPolicyProvisioningAction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "accessPolicyId" TEXT NOT NULL,
    "provisioningServiceAPICallId" TEXT,
    "actionType" TEXT NOT NULL,
    CONSTRAINT "AccessPolicyProvisioningAction_accessPolicyId_fkey" FOREIGN KEY ("accessPolicyId") REFERENCES "AccessPolicy" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AccessPolicyProvisioningAction_provisioningServiceAPICallId_fkey" FOREIGN KEY ("provisioningServiceAPICallId") REFERENCES "ProvisioningServiceAPICall" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AccessPolicyProvisioningAction" ("accessPolicyId", "actionType", "createdAt", "deletedAt", "id", "provisioningServiceAPICallId", "updatedAt") SELECT "accessPolicyId", "actionType", "createdAt", "deletedAt", "id", "provisioningServiceAPICallId", "updatedAt" FROM "AccessPolicyProvisioningAction";
DROP TABLE "AccessPolicyProvisioningAction";
ALTER TABLE "new_AccessPolicyProvisioningAction" RENAME TO "AccessPolicyProvisioningAction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
