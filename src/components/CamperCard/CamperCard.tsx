import Image from "next/image";
import {
  MdLocationOn,
  MdAcUnit,
  MdKitchen,
  MdBathtub,
  MdTv,
  MdRadio,
  MdMicrowave,
  MdOutlineKitchen,
  MdLocalGasStation,
  MdOutlineWaterDrop,
} from "react-icons/md";
import { TbManualGearbox, TbAutomaticGearbox } from "react-icons/tb";
import StarRating from "@/components/StarRating/StarRating";
import type { CamperListItem } from "@/types/camper";
import styles from "./CamperCard.module.css";

const AMENITY_ICONS: Record<string, { icon: React.ReactNode; label: string }> = {
  ac: { icon: <MdAcUnit />, label: "AC" },
  bathroom: { icon: <MdBathtub />, label: "Bathroom" },
  kitchen: { icon: <MdKitchen />, label: "Kitchen" },
  tv: { icon: <MdTv />, label: "TV" },
  radio: { icon: <MdRadio />, label: "Radio" },
  refrigerator: { icon: <MdOutlineKitchen />, label: "Refrigerator" },
  microwave: { icon: <MdMicrowave />, label: "Microwave" },
  gas: { icon: <MdLocalGasStation />, label: "Gas" },
  water: { icon: <MdOutlineWaterDrop />, label: "Water" },
};

export default function CamperCard({ camper }: { camper: CamperListItem }) {
  const image = camper.gallery?.[0]?.thumb ?? camper.gallery?.[0]?.original;

  const features = [
    camper.transmission === "automatic" && {
      icon: <TbAutomaticGearbox />,
      label: "Automatic",
    },
    camper.transmission === "manual" && {
      icon: <TbManualGearbox />,
      label: "Manual",
    },
    camper.engine && { icon: <MdLocalGasStation />, label: camper.engine },
    ...(camper.amenities ?? []).map((a) => AMENITY_ICONS[a] ?? { icon: null, label: a }),
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  return (
    <li className={styles.card}>
      <div className={styles.imageWrap}>
        {image ? (
          <Image
            src={image}
            alt={camper.name}
            width={292}
            height={312}
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

        <a
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.showMore}
        >
          Show more
        </a>
      </div>
    </li>
  );
}
