import Image from "next/image";
import { MdLocationOn, MdLocalGasStation } from "react-icons/md";
import { TbManualGearbox, TbAutomaticGearbox } from "react-icons/tb";
import StarRating from "@/components/StarRating/StarRating";
import type { CamperListItem } from "@/types/camper";
import styles from "./CamperCard.module.css";

export default function CamperCard({ camper }: { camper: CamperListItem }) {
  const image = camper.gallery?.[0]?.thumb ?? camper.gallery?.[0]?.original;

  // Features exactly like in the mockup: Engine, Transmission, Form
  const features = [
    camper.engine && {
      icon: <MdLocalGasStation />,
      label: camper.engine,
    },
    camper.transmission === "automatic" && {
      icon: <TbAutomaticGearbox />,
      label: "Automatic",
    },
    camper.transmission === "manual" && {
      icon: <TbManualGearbox />,
      label: "Manual",
    },
    camper.form && {
      icon: null,
      label: camper.form.replace("_", " "),
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  return (
    <li className={styles.card}>
      <div className={styles.imageWrap}>
        {image ? (
          <Image
            src={image}
            alt={camper.name}
            width={260}
            height={200}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>{camper.name}</h3>
          <span className={styles.price}>€{camper.price}</span>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.rating}>
            <StarRating rating={camper.rating} />
            <span className={styles.reviewCount}>
              ({camper.totalReviews ?? 0} Reviews)
            </span>
          </span>

          <span className={styles.location}>
            <MdLocationOn /> {camper.location}
          </span>
        </div>

        {camper.description && (
          <p className={styles.description}>{camper.description}</p>
        )}

        <ul className={styles.features}>
          {features.map((f, i) => (
            <li key={`${f.label}-${i}`} className={styles.feature}>
              {f.icon}
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        <a href={`/catalog/${camper.id}`} className={styles.showMore}>
          Show more
        </a>
      </div>
    </li>
  );
}
