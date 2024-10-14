import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ChainDetail = ({ chainId }: { chainId: string }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  // ... other state and useEffect hooks

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-4 w-[150px]" />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // ... rest of the component
};

export default ChainDetail;
