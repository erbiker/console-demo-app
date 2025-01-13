'use server';

import prisma from '@/lib/prisma';
import { AccessPolicyProvisioningActionType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type UpdatePolicyData = {
  name?: string;
  description?: string;
  appId?: string;
  universalVisibility?: boolean;
  indefiniteAccess?: boolean;
  accessLengthDays?: number | null;
  UserVisibility?: {
    set: [];
    connect: { id: string }[];
  };
  UserGroupVisibility?: {
    set: [];
    connect: { id: string }[];
  };
};

type UpdateApprovalData = {
  ApprovalReviewers?: {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    deleteMany: {};
    create: { userId: string }[];
  };
};

export async function updatePolicy(policyId: string, data: UpdatePolicyData) {
  console.log(data);
  try {
    await prisma.accessPolicy.update({
      where: { id: policyId },
      data,
    });

    revalidatePath(`/access-policies/${policyId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteApproval(approvalId: string, policyId: string) {
  try {
    await prisma.accessPolicyApproval.delete({
      where: { id: approvalId },
    });
    revalidatePath(`/access-policies/${policyId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function addApproval(policyId: string) {
  try {
    await prisma.accessPolicyApproval.create({
      data: {
        accessPolicyId: policyId,
        priority: 1,
      },
    });
    revalidatePath(`/access-policies/${policyId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function updateApproval(
  approvalId: string,
  data: UpdateApprovalData,
  policyId: string,
) {
  try {
    await prisma.accessPolicyApproval.update({
      where: { id: approvalId },
      data,
    });
    revalidatePath(`/access-policies/${policyId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deletePolicy(policyId: string) {
  try {
    await prisma.accessPolicy.delete({
      where: { id: policyId },
    });
    revalidatePath('/access-policies');
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function publishPolicy(policyId: string) {
  // Validate that the policy has all the necessary data
  const policy = await prisma.accessPolicy.findUnique({
    where: { id: policyId },
    include: {
      _count: {
        select: {
          UserVisibility: true,
          UserGroupVisibility: true,
        },
      },
      Approvals: {
        include: {
          _count: {
            select: {
              ApprovalReviewers: true,
            },
          },
        },
      },
      ProvisioningActions: {
        select: {
          actionType: true,
          provisioningServiceAPICallId: true,
        },
      },
    },
  });

  // These validations are performed once on publish
  // In production, we should be always checking if a policy is in a valid state
  // and blocking publishing or an invalid update to a live policy
  // Alternatively, we could have a separate persisted state of the policy for published data
  // allowing a live policy to be updated as a draft and then published to update
  if (!policy) {
    return { success: false, error: 'Policy not found' };
  }

  const errors: string[] = [];
  const warnings: string[] = [];
  if (!policy.name) {
    errors.push('Policy name is required');
  }
  if (!policy.description) {
    errors.push('Policy description is required');
  }
  if (!policy.appId) {
    errors.push('Policy app is required');
  }

  if (
    !policy.universalVisibility &&
    policy._count.UserVisibility === 0 &&
    policy._count.UserGroupVisibility === 0
  ) {
    errors.push('Policy must have at least one user or group visibility or be visible to all');
  }

  if (policy.Approvals.length === 0) {
    warnings.push('Policy will not require approvals');
  }
  if (policy.Approvals.some((approval) => approval._count.ApprovalReviewers === 0)) {
    errors.push('Some approval steps do not have any approvers');
  }

  const grantActions = policy.ProvisioningActions.filter(
    (action) => action.actionType === 'GRANT_ACCESS',
  );
  const revokeActions = policy.ProvisioningActions.filter(
    (action) => action.actionType === 'REVOKE_ACCESS',
  );
  if (grantActions.length === 0) {
    errors.push('Policy must have at least one grant action');
  }
  if (!policy.indefiniteAccess && revokeActions.length === 0) {
    errors.push('Policy with an access expiration must have at least one revoke action');
  }

  if (
    grantActions.some((action) => !action.provisioningServiceAPICallId) ||
    revokeActions.some((action) => !action.provisioningServiceAPICallId)
  ) {
    errors.push('All access actions must have a provisioning service');
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  try {
    await prisma.accessPolicy.update({
      where: { id: policyId },
      data: { publishedAt: new Date() },
    });
    revalidatePath(`/access-policies/${policyId}`);
    return { success: true, warnings };
  } catch (error) {
    return { success: false, error };
  }
}

export async function unpublishPolicy(policyId: string) {
  try {
    await prisma.accessPolicy.update({
      where: { id: policyId },
      data: { publishedAt: null },
    });
    revalidatePath(`/access-policies/${policyId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function addProvisioningAction(
  policyId: string,
  actionType: AccessPolicyProvisioningActionType,
) {
  try {
    await prisma.accessPolicyProvisioningAction.create({
      data: {
        accessPolicyId: policyId,
        actionType,
      },
    });
    revalidatePath(`/access-policies/${policyId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
