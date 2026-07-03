import styles from "./Loader.module.css";

interface LoaderProps {
  title?: string;
  description?: string;
  overlay?: boolean;
}

export default function Loader({
  title = "Loading tracks...",
  description = "Please wait while we fetch the best travel trucks for you",
  overlay = true,
}: LoaderProps) {
  const content = (
    <div className={styles.modal} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className={styles.overlay} aria-busy="true">
        {content}
      </div>
    );
  }

  return <div className={styles.inline}>{content}</div>;
}
