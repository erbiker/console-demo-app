'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type UpdatePolicyData = {
  name?: string;
  description?: string;
  appId?: string;
  universalVisibility?: boolean;
  indefiniteAccess?: boolean;
  accessLengthDays?: number | null;
  UserVisibility?: {
    set: { id: string }[];
  };
  UserGroupVisibility?: {
    set: { id: string }[];
  };
};

type UpdateApprovalData = {
  ApprovalReviewers?: {
    set: { id: string }[];
  };
};

export async function updatePolicy(policyId: string, data: UpdatePolicyData) {
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
  try {
    await prisma.accessPolicy.update({
      where: { id: policyId },
      data: { publishedAt: new Date() },
    });
    revalidatePath(`/access-policies/${policyId}`);
    return { success: true };
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
