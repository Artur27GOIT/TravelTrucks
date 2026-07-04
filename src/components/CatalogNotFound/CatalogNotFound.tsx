"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./CatalogNotFound.module.css";
import notFoundImg from "@/img/not-found.png";

export default function CatalogNotFound({ onReset }: { onReset: () => void }) {
  const router = useRouter();

  const handleViewAll = () => {
    onReset();
    router.push("/catalog");
  };

  return (
    <div className={styles.wrapper}>
      <Image
        src={notFoundImg}
        alt="No campers found"
        className={styles.image}
        priority
      />

      <h2 className={styles.title}>No campers found</h2>

      <p className={styles.text}>
        We couldn’t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={styles.actions}>
        <button className={styles.clearBtn} onClick={onReset}>
          Clear filters
        </button>

        <button className={styles.viewAllBtn} onClick={handleViewAll}>
          View all campers
        </button>
      </div>
    </div>
  );
}
