"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { submitBooking } from "@/lib/api";
import styles from "./BookingForm.module.css";

export default function BookingForm({ camperId }: { camperId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: (data) => {
      toast.success(data.message ?? "Booking request accepted!");
      setName("");
      setEmail("");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }
    mutation.mutate({ camperId, name, email });
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={styles.submit}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
