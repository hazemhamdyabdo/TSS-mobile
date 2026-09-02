import { useEffect, useState } from 'react';

export function useMockListFetch(fetcher: () => Promise<unknown>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetcher().finally(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return isLoading;
}
