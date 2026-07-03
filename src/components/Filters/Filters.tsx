"use client";

import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { useAvailableFilters } from "@/hooks/useAvailableFilters";
import type { CamperFilters, CamperForm, Engine, Transmission } from "@/types/camper";
import styles from "./Filters.module.css";

interface Props {
  initialFilters: CamperFilters;
  onSearch: (filters: CamperFilters) => void;
}

const FORM_LABELS: Record<CamperForm, string> = {
  alcove: "Alcove",
  panel_van: "Van",
  integrated: "Fully Integrated",
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

// Sensible fallback in case the /campers/filters request hasn't resolved yet.
const FALLBACK_FORMS: CamperForm[] = ["alcove", "panel_van", "integrated", "semi_integrated"];
const FALLBACK_ENGINES: Engine[] = ["diesel", "petrol", "hybrid", "electric"];
const FALLBACK_TRANSMISSIONS: Transmission[] = ["automatic", "manual"];

export default function Filters({ initialFilters, onSearch }: Props) {
  const { data: availableFilters } = useAvailableFilters();

  const [location, setLocation] = useState(initialFilters.location ?? "");
  const [form, setForm] = useState(initialFilters.form);
  const [engine, setEngine] = useState(initialFilters.engine);
  const [transmission, setTransmission] = useState(initialFilters.transmission);

  function toggle<T>(
    value: T,
    current: T | undefined,
    setter: (v: T | undefined) => void
  ) {
    setter(current === value ? undefined : value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch({ location: location.trim() || undefined, form, engine, transmission });
  }

  const forms = availableFilters?.forms ?? FALLBACK_FORMS;
  const engines = availableFilters?.engines ?? FALLBACK_ENGINES;
  const transmissions = availableFilters?.transmissions ?? FALLBACK_TRANSMISSIONS;

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <div className={styles.locationInput}>
          <MdLocationOn className={styles.locationIcon} />
          <input
            id="location"
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>
          <TbManualGearbox /> Transmission
        </legend>
        <div className={styles.options}>
          {transmissions.map((t) => (
            <button
              type="button"
              key={t}
              className={transmission === t ? styles.optionActive : styles.option}
              onClick={() => toggle(t, transmission, setTransmission)}
            >
              {TRANSMISSION_LABELS[t]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Engine</legend>
        <div className={styles.options}>
          {engines.map((eOpt) => (
            <button
              type="button"
              key={eOpt}
              className={engine === eOpt ? styles.optionActive : styles.option}
              onClick={() => toggle(eOpt, engine, setEngine)}
            >
              {ENGINE_LABELS[eOpt]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Vehicle type</legend>
        <div className={styles.options}>
          {forms.map((b) => (
            <button
              type="button"
              key={b}
              className={form === b ? styles.optionActive : styles.option}
              onClick={() => toggle(b, form, setForm)}
            >
              {FORM_LABELS[b]}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}
