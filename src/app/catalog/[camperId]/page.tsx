import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCamperById } from "@/lib/api";
import CamperDetailsView from "@/components/CamperDetailsView/CamperDetailsView";

interface Props {
  params: { camperId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const camper = await fetchCamperById(params.camperId);
    return {
      title: camper.name,
      description: camper.description?.slice(0, 155),
    };
  } catch {
    return { title: "Camper details" };
  }
}

export default async function CamperDetailsPage({ params }: Props) {
  try {
    const camper = await fetchCamperById(params.camperId);
    return <CamperDetailsView camper={camper} />;
  } catch {
    notFound();
  }
}
