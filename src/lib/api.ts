import axios from "axios";
import type {
  CampersResponse,
  CamperDetails,
  CamperFilters,
  AvailableFilters,
  Review,
} from "@/types/camper";

export const api = axios.create({
  baseURL: "https://campers-api.goit.study",
});

export const CAMPERS_PER_PAGE = 4;

export async function fetchCampers(
  page: number,
  filters: CamperFilters = {}
): Promise<CampersResponse> {
  const params: Record<string, string> = {
    page: String(page),
    perPage: String(CAMPERS_PER_PAGE),
  };

  if (filters.location) params.location = filters.location;
  if (filters.form) params.form = filters.form;
  if (filters.transmission) params.transmission = filters.transmission;
  if (filters.engine) params.engine = filters.engine;

  const { data } = await api.get<CampersResponse>("/campers", { params });
  return data;
}

export async function fetchCamperById(id: string): Promise<CamperDetails> {
  const { data } = await api.get<CamperDetails>(`/campers/${id}`);
  return data;
}

export async function fetchCamperReviews(id: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/campers/${id}/reviews`);
  return data;
}

export async function fetchAvailableFilters(): Promise<AvailableFilters> {
  const { data } = await api.get<AvailableFilters>("/campers/filters");
  return data;
}

export interface BookingPayload {
  camperId: string;
  name: string;
  email: string;
}

export interface BookingResponse {
  message: string;
}

export async function submitBooking({
  camperId,
  name,
  email,
}: BookingPayload): Promise<BookingResponse> {
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    { name, email }
  );
  return data;
}
