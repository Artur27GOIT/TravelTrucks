import { useQuery } from "@tanstack/react-query";
import { fetchCamperReviews } from "@/lib/api";

export function useCamperReviews(camperId: string) {
  return useQuery({
    queryKey: ["camper-reviews", camperId],
    queryFn: () => fetchCamperReviews(camperId),
  });
}
