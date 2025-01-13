'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateToast } from '@/hooks/use-update-toast';
import {
  AccessPolicyProvisioningAction,
  AccessPolicyProvisioningActionType,
  ProvisioningService,
  ProvisioningServiceAPICall,
} from '@prisma/client';
import { AccessStep } from './access-step';
import { addProvisioningAction } from './actions';

type Props = {
  policyId: string;
  provisioningActions: AccessPolicyProvisioningAction[];
  allProvisioningServices: ProvisioningService[];
  allProvisioningServiceAPICalls: ProvisioningServiceAPICall[];
  tab: 'Grant' | 'Revoke';
};

export function AccessTab({
  policyId,
  provisioningActions,
  allProvisioningServices,
  allProvisioningServiceAPICalls,
  tab,
}: Props) {
  const { showUpdateToast } = useUpdateToast();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>{tab} Access</CardTitle>
            <CardDescription>Set steps to {tab.toLowerCase()} access to this app.</CardDescription>
          </div>
          <Button
            onClick={async () => {
              const result = await addProvisioningAction(
                policyId,
                tab === 'Grant'
                  ? AccessPolicyProvisioningActionType.GRANT_ACCESS
                  : AccessPolicyProvisioningActionType.REVOKE_ACCESS,
              );
              showUpdateToast(result);
            }}
          >
            Add Provisioning Step
          </Button>
        </div>
      </CardHeader>
      <CardContent className="mt-4 space-y-2">
        <div className="space-y-1">
          {provisioningActions.map((action, index) => (
            <AccessStep
              key={action.id}
              provisioningAction={action}
              index={index}
              policyId={policyId}
              allProvisioningServices={allProvisioningServices}
              allProvisioningServiceAPICalls={allProvisioningServiceAPICalls}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
