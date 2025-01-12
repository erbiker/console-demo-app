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
