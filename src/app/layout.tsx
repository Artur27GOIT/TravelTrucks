import type { Metadata } from "next";
import QueryProvider from "@/components/providers/QueryProvider";
import Header from "@/components/Header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TravelTrucks — Camper rental",
    template: "%s | TravelTrucks",
  },
  description:
    "Rent the perfect camper van for your next adventure with TravelTrucks. Browse our fleet, filter by your needs, and book online.",
  keywords: ["camper rental", "campervan", "RV rental", "TravelTrucks"],
  openGraph: {
    title: "TravelTrucks — Camper rental",
    description:
      "Rent the perfect camper van for your next adventure with TravelTrucks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
