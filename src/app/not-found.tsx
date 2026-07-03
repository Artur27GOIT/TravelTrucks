import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1>404 — Page not found</h1>
      <p>We couldn&apos;t find what you were looking for.</p>
      <Link href="/" style={{ color: "#e44848", fontWeight: 600 }}>
        Back to home
      </Link>
    </main>
  );
}
