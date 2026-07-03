import StarRating from "@/components/StarRating/StarRating";
import type { Review } from "@/types/camper";
import styles from "./Reviews.module.css";

export default function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review, i) => (
        <li key={i} className={styles.item}>
          <div className={styles.avatar}>
            {review.reviewer_name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className={styles.name}>{review.reviewer_name}</p>
            <StarRating rating={review.reviewer_rating} />
            <p className={styles.comment}>{review.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
