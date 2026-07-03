import type { Metadata } from "next";
import Link from "next/link";
import homePicture from "@/img/home-picture.jpg";
import homePicture2x from "@/img/home-picture2x.jpg";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Campers of all types for your next trip! Find and book the perfect camper van with TravelTrucks.",
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <picture className={styles.heroPicture}>
          <source
            media="(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)"
            srcSet={homePicture2x.src}
          />
          <img
            src={homePicture.src}
            alt=""
            className={styles.heroImage}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link href="/catalog" className={styles.cta}>
            View Now
          </Link>
        </div>
      </section>
    </main>
  );
}
