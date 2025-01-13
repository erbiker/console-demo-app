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
import { deleteApproval } from './actions';

type Props = {
  provisioningAction: AccessPolicyProvisioningAction;
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
        <Label className="font-semibold" htmlFor="service">
          Service
        </Label>
        <Select>
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
        {}
      </CardContent>
    </Card>
  );
}
