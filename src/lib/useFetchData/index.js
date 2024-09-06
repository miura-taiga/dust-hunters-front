import useSWR from "swr";
import { fetcher } from "@/lib";

export default function useFetchData(url, token) {
  const { data } = useSWR(url, fetcher);
  return data;
}
