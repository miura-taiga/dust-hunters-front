import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

export default function useFetchData<T>(url: string): T | undefined {
  const { data } = useSWR<T>(url, fetcher);
  return data;
}
