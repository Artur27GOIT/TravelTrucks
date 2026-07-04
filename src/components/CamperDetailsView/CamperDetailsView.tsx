"use client";

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

const cap = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

export default function CamperDetailsView({
  camper,
}: {
  camper: CamperDetails;
}) {
  const { data: reviews, isLoading: reviewsLoading } = useCamperReviews(
    camper.id,
  );

  const reviewsCount = camper.totalReviews ?? reviews?.length ?? 0;

  const chips = [
    camper.transmission && cap(camper.transmission),
    camper.engine && cap(camper.engine),
    ...(camper.amenities ?? []).map((k) => AMENITY_LABELS[k] ?? cap(k)),
  ].filter(Boolean) as string[];

  const specs = [
    camper.form && { label: "Form", value: cap(camper.form) },
    camper.length && { label: "Length", value: camper.length },
    camper.width && { label: "Width", value: camper.width },
    camper.height && { label: "Height", value: camper.height },
    camper.tank && { label: "Tank", value: camper.tank },
    camper.consumption && { label: "Consumption", value: camper.consumption },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.topGrid}>
        <div className={styles.galleryCol}>
          {camper.gallery && camper.gallery.length > 0 && (
            <Gallery images={camper.gallery} alt={camper.name} />
          )}
        </div>

        <div className={styles.infoCol}>
          <div className={styles.card}>
            <h1 className={styles.name}>{camper.name}</h1>

            <div className={styles.metaRow}>
              <span className={styles.rating}>
                <StarRating rating={camper.rating} />
                <span className={styles.reviewCount}>
                  {camper.rating} ({reviewsCount} Reviews)
                </span>
              </span>
              <span className={styles.location}>
                <svg className={styles.locationIcon} width={15} height={15}>
                  <use href="#icon-building" />
                </svg>
                {camper.location}
              </span>
            </div>

            <p className={styles.price}>€{camper.price}</p>

            {camper.description && (
              <p className={styles.description}>{camper.description}</p>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Vehicle details</h2>

            {chips.length > 0 && (
              <ul className={styles.chips}>
                {chips.map((c) => (
                  <li key={c} className={styles.chip}>
                    {c}
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.divider} />

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
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.reviewsCol}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          {reviewsLoading ? (
            <Loader overlay={false} title="Loading reviews..." description="" />
          ) : (
            <div className={styles.container_review}>
              <Reviews reviews={reviews ?? []} />
            </div>
          )}
        </div>

        <div className={styles.container_form}>
          <div className={styles.formCol}>
            <BookingForm camperId={camper.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
