import { useQuery } from "@tanstack/react-query";
import { fetchAvailableFilters } from "@/lib/api";

export function useAvailableFilters() {
  return useQuery({
    queryKey: ["available-filters"],
    queryFn: fetchAvailableFilters,
    staleTime: Infinity,
  });
}
