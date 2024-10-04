import useSWR from "swr";
import { fetcher } from "@/utils/swr/fetcher";
import { useMemo } from "react";

export function useCrypto(crypto: string, timeInterval: string) {
  const { data, isLoading } = useSWR(
    `/api/${crypto}?timeInterval=${timeInterval}`,
    fetcher
  );

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, isLoading };
}
