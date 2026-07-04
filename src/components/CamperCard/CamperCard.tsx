import Image from "next/image";
import type { CamperListItem } from "@/types/camper";
import styles from "./CamperCard.module.css";

export default function CamperCard({ camper }: { camper: CamperListItem }) {
  const image = camper.coverImage;

  const features = [
    camper.engine && { icon: "icon-doc", label: camper.engine },
    camper.transmission === "automatic" && {
      icon: "icon-filters",
      label: "Automatic",
    },
    camper.transmission === "manual" && {
      icon: "icon-filters",
      label: "Manual",
    },
    camper.form && {
      icon: "icon-truck",
      label: camper.form.replace("_", " "),
    },
  ].filter(Boolean) as { icon: string; label: string }[];
  console.log(camper.gallery);

  return (
    <li className={styles.card}>
      <div className={styles.imageWrap}>
        {image ? (
          <Image
            src={image}
            alt={camper.name}
            width={219}
            height={240}
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
            <svg width={16} height={16}>
              <use href="#icon-star" />
            </svg>
            {camper.rating}({camper.totalReviews ?? 0} Reviews)
          </span>

          <span className={styles.location}>
            <svg width={16} height={16}>
              <use href="#icon-building" />
            </svg>
            {camper.location}
          </span>
        </div>

        {camper.description && (
          <p className={styles.description}>{camper.description}</p>
        )}

        <ul className={styles.features}>
          {features.map((f, i) => (
            <li key={`${f.label}-${i}`} className={styles.feature}>
              <svg width={16} height={16}>
                <use href={`#${f.icon}`} />
              </svg>
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
