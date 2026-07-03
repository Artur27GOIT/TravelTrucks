"use client";

import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import StarRating from "@/components/StarRating/StarRating";
import Gallery from "@/components/Gallery/Gallery";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import Loader from "@/components/Loader/Loader";
import { useCamperReviews } from "@/hooks/useCamperReviews";
import type { CamperDetails } from "@/types/camper";
import styles from "./CamperDetailsView.module.css";

const AMENITY_LABELS: Record<string, string> = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

export default function CamperDetailsView({
  camper,
}: {
  camper: CamperDetails;
}) {
  const [tab, setTab] = useState<"features" | "reviews">("features");
  const { data: reviews, isLoading: reviewsLoading } = useCamperReviews(camper.id);

  const specs = [
    camper.form && { label: "Form", value: camper.form },
    camper.length && { label: "Length", value: camper.length },
    camper.width && { label: "Width", value: camper.width },
    camper.height && { label: "Height", value: camper.height },
    camper.tank && { label: "Tank", value: camper.tank },
    camper.consumption && { label: "Consumption", value: camper.consumption },
    camper.transmission && { label: "Transmission", value: camper.transmission },
    camper.engine && { label: "Engine", value: camper.engine },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.headerBlock}>
        <h1 className={styles.name}>{camper.name}</h1>
        <div className={styles.metaRow}>
          <span className={styles.rating}>
            <StarRating rating={camper.rating} />
            <span className={styles.reviewCount}>
              ({camper.totalReviews ?? reviews?.length ?? 0} Reviews)
            </span>
          </span>
          <span className={styles.location}>
            <MdLocationOn /> {camper.location}
          </span>
        </div>
        <p className={styles.price}>€{camper.price}</p>
      </div>

      <div className={styles.mainGrid}>
        <div>
          {camper.gallery && camper.gallery.length > 0 && (
            <Gallery images={camper.gallery} alt={camper.name} />
          )}
          {camper.description && (
            <p className={styles.description}>{camper.description}</p>
          )}

          <div className={styles.tabs}>
            <button
              className={tab === "features" ? styles.tabActive : styles.tab}
              onClick={() => setTab("features")}
            >
              Features
            </button>
            <button
              className={tab === "reviews" ? styles.tabActive : styles.tab}
              onClick={() => setTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {tab === "features" ? (
            <div className={styles.featuresBlock}>
              {camper.amenities?.length > 0 && (
                <ul className={styles.equipmentList}>
                  {camper.amenities.map((key) => (
                    <li key={key} className={styles.equipmentItem}>
                      {AMENITY_LABELS[key] ?? key}
                    </li>
                  ))}
                </ul>
              )}
              <table className={styles.specsTable}>
                <tbody>
                  {specs.map((s) => (
                    <tr key={s.label}>
                      <th>{s.label}</th>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : reviewsLoading ? (
            <Loader
              overlay={false}
              title="Loading reviews..."
              description=""
            />
          ) : (
            <Reviews reviews={reviews ?? []} />
          )}
        </div>

        <BookingForm camperId={camper.id} />
      </div>
    </div>
  );
}
