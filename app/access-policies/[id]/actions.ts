'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updatePolicyApp(policyId: string, appId: string) {
  try {
    await prisma.accessPolicy.update({
      where: { id: policyId },
      data: { appId },
    });

    revalidatePath(`/access-policies/${policyId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
}
