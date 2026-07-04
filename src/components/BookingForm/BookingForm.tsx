"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { submitBooking } from "@/lib/api";
import styles from "./BookingForm.module.css";

export default function BookingForm({ camperId }: { camperId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const mutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: (data) => {
      toast.success(data.message ?? "Booking request accepted!");
      setName("");
      setEmail("");
      setErrors({ name: "", email: "" });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  function validate() {
    const newErrors: any = {};

    if (!name.trim() || !name.includes(" ")) {
      newErrors.name = "Please enter your full name.";
    }

    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Invalid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    mutation.mutate({ camperId, name, email });
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* NAME FIELD */}
        <div className={styles.field}>
          {errors.name && <div className={styles.labelBox}>Name*</div>}

          <div className={styles.inputWrap}>
            <input
              className={
                errors.name
                  ? `${styles.input} ${styles.inputError}`
                  : styles.input
              }
              type="text"
              placeholder="Name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && <span className={styles.errorIcon}>!</span>}
          </div>

          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          {errors.email && <div className={styles.labelBox}>Email*</div>}

          <div className={styles.inputWrap}>
            <input
              className={
                errors.email
                  ? `${styles.input} ${styles.inputError}`
                  : styles.input
              }
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && <span className={styles.errorIcon}>!</span>}
          </div>

          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

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
