"use client";

import { useState, useEffect } from "react";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";
import type {
  CamperFilters,
  CamperForm,
  Engine,
  Transmission,
} from "@/types/camper";
import styles from "./Filters.module.css";

interface Props {
  initialFilters: CamperFilters;
  onSearch: (filters: CamperFilters) => void;
}

const FORM_LABELS: Record<CamperForm, string> = {
  alcove: "Alcove",
  panel_van: "Panel Van",
  integrated: "Integrated",
  semi_integrated: "Semi Integrated",
};

const ENGINE_LABELS: Record<Engine, string> = {
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  electric: "Electric",
};

const TRANSMISSION_LABELS: Record<Transmission, string> = {
  automatic: "Automatic",
  manual: "Manual",
};

export default function Filters({ initialFilters, onSearch }: Props) {
  const { data: availableFilters } = useAvailableFilters();

  const [location, setLocation] = useState(initialFilters.location ?? "");
  const [form, setForm] = useState(initialFilters.form);
  const [engine, setEngine] = useState(initialFilters.engine);
  const [transmission, setTransmission] = useState(initialFilters.transmission);

  useEffect(() => {
    if (Object.keys(initialFilters).length === 0) {
      setLocation("");
      setForm(undefined);
      setEngine(undefined);
      setTransmission(undefined);
    }
  }, [initialFilters]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch({
      location: location.trim() || undefined,
      form,
      engine,
      transmission,
    });
  }

  function handleClear() {
    setLocation("");
    setForm(undefined);
    setEngine(undefined);
    setTransmission(undefined);
    onSearch({});
  }

  const forms = availableFilters?.forms ?? [
    "alcove",
    "panel_van",
    "integrated",
    "semi_integrated",
  ];
  const engines = availableFilters?.engines ?? [
    "diesel",
    "petrol",
    "hybrid",
    "electric",
  ];
  const transmissions = availableFilters?.transmissions ?? [
    "automatic",
    "manual",
  ];

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <div className={styles.locationInput}>
          <svg className={styles.locationIcon} width={15} height={15}>
            <use href="#icon-building" />
          </svg>
          <input
            id="location"
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <h3 className={styles.filtersTitle}>Filters</h3>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Camper form</legend>
        <div className={styles.options}>
          {forms.map((opt) => (
            <label key={opt} className={styles.radioOption}>
              <input
                type="radio"
                name="form"
                checked={form === opt}
                onChange={() => setForm(opt)}
                onClick={() => form === opt && setForm(undefined)}
              />
              <span className={styles.radioMark} />
              {FORM_LABELS[opt]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Engine</legend>
        <div className={styles.options}>
          {engines.map((opt) => (
            <label key={opt} className={styles.radioOption}>
              <input
                type="radio"
                name="engine"
                checked={engine === opt}
                onChange={() => setEngine(opt)}
                onClick={() => engine === opt && setEngine(undefined)}
              />
              <span className={styles.radioMark} />
              {ENGINE_LABELS[opt]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Transmission</legend>
        <div className={styles.options}>
          {transmissions.map((opt) => (
            <label key={opt} className={styles.radioOption}>
              <input
                type="radio"
                name="transmission"
                checked={transmission === opt}
                onChange={() => setTransmission(opt)}
                onClick={() =>
                  transmission === opt && setTransmission(undefined)
                }
              />
              <span className={styles.radioMark} />
              {TRANSMISSION_LABELS[opt]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.buttons}>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
        >
          <span className={styles.clearIcon}>×</span>
          <span>Clear filters</span>
        </button>
      </div>
    </form>
  );
}
