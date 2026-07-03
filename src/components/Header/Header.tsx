import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Travel<span className={styles.logoAccent}>Trucks</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/catalog" className={styles.navLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
