-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessPolicy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "publishedAt" DATETIME,
    "universalVisibility" BOOLEAN NOT NULL DEFAULT false,
    "indefiniteAccess" BOOLEAN NOT NULL DEFAULT false,
    "accessLengthDays" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "AccessPolicy_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AccessPolicy" ("accessLengthDays", "appId", "createdAt", "deletedAt", "description", "id", "indefiniteAccess", "name", "publishedAt", "universalVisibility", "updatedAt") SELECT "accessLengthDays", "appId", "createdAt", "deletedAt", "description", "id", "indefiniteAccess", "name", "publishedAt", "universalVisibility", "updatedAt" FROM "AccessPolicy";
DROP TABLE "AccessPolicy";
ALTER TABLE "new_AccessPolicy" RENAME TO "AccessPolicy";
CREATE TABLE "new_AccessPolicyApprovalReviewer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accessPolicyApprovalId" TEXT NOT NULL,
    "requiredReviewer" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "AccessPolicyApprovalReviewer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AccessPolicyApprovalReviewer_accessPolicyApprovalId_fkey" FOREIGN KEY ("accessPolicyApprovalId") REFERENCES "AccessPolicyApproval" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AccessPolicyApprovalReviewer" ("accessPolicyApprovalId", "id", "requiredReviewer", "userId") SELECT "accessPolicyApprovalId", "id", "requiredReviewer", "userId" FROM "AccessPolicyApprovalReviewer";
DROP TABLE "AccessPolicyApprovalReviewer";
ALTER TABLE "new_AccessPolicyApprovalReviewer" RENAME TO "AccessPolicyApprovalReviewer";
CREATE TABLE "new_AccessPolicyProvisioningAction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "accessPolicyId" TEXT NOT NULL,
    "provisioningServiceAPICallId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    CONSTRAINT "AccessPolicyProvisioningAction_accessPolicyId_fkey" FOREIGN KEY ("accessPolicyId") REFERENCES "AccessPolicy" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AccessPolicyProvisioningAction_provisioningServiceAPICallId_fkey" FOREIGN KEY ("provisioningServiceAPICallId") REFERENCES "ProvisioningServiceAPICall" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AccessPolicyProvisioningAction" ("accessPolicyId", "actionType", "createdAt", "deletedAt", "id", "provisioningServiceAPICallId", "updatedAt") SELECT "accessPolicyId", "actionType", "createdAt", "deletedAt", "id", "provisioningServiceAPICallId", "updatedAt" FROM "AccessPolicyProvisioningAction";
DROP TABLE "AccessPolicyProvisioningAction";
ALTER TABLE "new_AccessPolicyProvisioningAction" RENAME TO "AccessPolicyProvisioningAction";
CREATE TABLE "new_ProvisioningServiceAPICall" (
    "id" TEXT NOT NULL PRIMARY KEY,
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

-- CreateIndex
CREATE INDEX "UserGroup_name_idx" ON "UserGroup"("name");
