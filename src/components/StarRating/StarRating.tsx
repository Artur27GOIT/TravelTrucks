import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "./StarRating.module.css";

export default function StarRating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = rating - i;
    if (diff >= 1) return <FaStar key={i} />;
    if (diff >= 0.5) return <FaStarHalfAlt key={i} />;
    return <FaRegStar key={i} />;
  });

  return (
    <span className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
      {stars}
    </span>
  );
}
