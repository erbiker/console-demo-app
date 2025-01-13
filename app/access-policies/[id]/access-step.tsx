'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateToast } from '@/hooks/use-update-toast';
import {
  AccessPolicyProvisioningAction,
  ProvisioningService,
  ProvisioningServiceAPICall,
} from '@prisma/client';
import { TrashIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { deleteApproval, updateProvisioningAction } from './actions';

type Props = {
  provisioningAction: AccessPolicyProvisioningAction & {
    ProvisioningServiceAPICall: ProvisioningServiceAPICall | null;
  };
  index: number;
  policyId: string;
  allProvisioningServices: ProvisioningService[];
  allProvisioningServiceAPICalls: ProvisioningServiceAPICall[];
};

export function AccessStep({
  provisioningAction,
  index,
  policyId,
  allProvisioningServices,
  allProvisioningServiceAPICalls,
}: Props) {
  const { showUpdateToast } = useUpdateToast();

  const [service, setService] = useState<ProvisioningService | null>(
    allProvisioningServices.find(
      (service) =>
        service.id === provisioningAction.ProvisioningServiceAPICall?.provisioningServiceId,
    ) ?? null,
  );
  const [apiCall, setApiCall] = useState<ProvisioningServiceAPICall | null>(
    provisioningAction.ProvisioningServiceAPICall,
  );
  return (
    <Card key={provisioningAction.id} className="bg-zinc-100 dark:bg-zinc-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Provisioning step {index + 1}</CardTitle>
        <Button
          variant="destructive"
          size="icon"
          onClick={async () => {
            const result = await deleteApproval(provisioningAction.id, policyId);
            showUpdateToast(result);
          }}
        >
          <TrashIcon />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label className="font-semibold" htmlFor="service">
            Service
          </Label>
          <Select
            value={service?.id}
            onValueChange={(value) =>
              setService(allProvisioningServices.find((service) => service.id === value) ?? null)
            }
          >
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a provisioning service" />
            </SelectTrigger>
            <SelectContent>
              {allProvisioningServices.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {service && (
            <div>
              <Label className="font-semibold" htmlFor="action">
                Action
              </Label>
              <Select
                value={apiCall?.id}
                onValueChange={async (value) => {
                  setApiCall(
                    allProvisioningServiceAPICalls.find((apiCall) => apiCall.id === value) ?? null,
                  );
                  const result = await updateProvisioningAction(
                    provisioningAction.id,
                    {
                      provisioningServiceAPICallId: value,
                    },
                    policyId,
                  );
                  showUpdateToast(result);
                }}
              >
                <SelectTrigger id="action">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  {allProvisioningServiceAPICalls
                    .filter((apiCall) => apiCall.provisioningServiceId === service.id)
                    .map((apiCall) => (
                      <SelectItem key={apiCall.id} value={apiCall.id}>
                        {apiCall.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
