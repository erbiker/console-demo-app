import { useToast } from '@/hooks/use-toast';

interface UpdateResult {
  success: boolean;
}

interface UpdateToastOptions {
  successMessage?: string;
  errorMessage?: string;
}

export function useUpdateToast() {
  const { toast } = useToast();

  const showUpdateToast = (result: UpdateResult, options?: UpdateToastOptions) => {
    if (result.success) {
      toast({
        title: 'Success',
        description: options?.successMessage ?? 'Changes saved',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: options?.errorMessage ?? 'Failed to save changes',
      });
    }
  };

  return { showUpdateToast };
}
