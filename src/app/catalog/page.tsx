import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse our full fleet of campers. Filter by location, body type, engine and transmission to find your perfect ride.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}
