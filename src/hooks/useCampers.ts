import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCampers, CAMPERS_PER_PAGE } from "@/lib/api";
import type { CamperFilters } from "@/types/camper";

export function useCampers(filters: CamperFilters) {
  return useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) => fetchCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      allPages.length < lastPage.totalPages ? allPages.length + 1 : undefined,
  });
}

export { CAMPERS_PER_PAGE };
