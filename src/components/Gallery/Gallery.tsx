"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { GalleryImage } from "@/types/camper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import styles from "./Gallery.module.css";

export default function Gallery({
  images,
  alt,
}: {
  images: GalleryImage[];
  alt: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!images?.length) return null;

  return (
    <div className={styles.gallery}>
      <Swiper
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className={styles.mainSwiper}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img.original}
              alt={`${alt} — photo ${i + 1}`}
              width={638}
              height={505}
              className={styles.mainImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Thumbs]}
        spaceBetween={32}
        slidesPerView={Math.min(images.length, 4)}
        freeMode
        watchSlidesProgress
        className={styles.thumbSwiper}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img.thumb}
              alt={`${alt} — thumbnail ${i + 1}`}
              width={136}
              height={144}
              className={styles.thumbImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
