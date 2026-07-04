"use client";

import { useState } from "react";
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

const FALLBACK_FORMS: CamperForm[] = [
  "alcove",
  "panel_van",
  "integrated",
  "semi_integrated",
];
const FALLBACK_ENGINES: Engine[] = ["diesel", "petrol", "hybrid", "electric"];
const FALLBACK_TRANSMISSIONS: Transmission[] = ["automatic", "manual"];

function RadioGroup<T extends string>({
  name,
  options,
  labels,
  value,
  onChange,
}: {
  name: string;
  options: T[];
  labels: Record<T, string>;
  value: T | undefined;
  onChange: (v: T | undefined) => void;
}) {
  return (
    <div className={styles.options}>
      {options.map((opt) => (
        <label key={opt} className={styles.radioOption}>
          <input
            type="radio"
            name={name}
            checked={value === opt}
            onChange={() => onChange(opt)}
            onClick={() => value === opt && onChange(undefined)}
          />
          <span className={styles.radioMark} />
          {labels[opt]}
        </label>
      ))}
    </div>
  );
}

export default function Filters({ initialFilters, onSearch }: Props) {
  const { data: availableFilters } = useAvailableFilters();

  const [location, setLocation] = useState(initialFilters.location ?? "");
  const [form, setForm] = useState(initialFilters.form);
  const [engine, setEngine] = useState(initialFilters.engine);
  const [transmission, setTransmission] = useState(initialFilters.transmission);

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

  const forms = availableFilters?.forms ?? FALLBACK_FORMS;
  const engines = availableFilters?.engines ?? FALLBACK_ENGINES;
  const transmissions =
    availableFilters?.transmissions ?? FALLBACK_TRANSMISSIONS;

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <div className={styles.locationInput}>
          <svg className={styles.locationIcon} width={20} height={20}>
            <use href="/img/sprite.svg#icon-building" />
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
        <RadioGroup
          name="form"
          options={forms}
          labels={FORM_LABELS}
          value={form}
          onChange={setForm}
        />
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Engine</legend>
        <RadioGroup
          name="engine"
          options={engines}
          labels={ENGINE_LABELS}
          value={engine}
          onChange={setEngine}
        />
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Transmission</legend>
        <RadioGroup
          name="transmission"
          options={transmissions}
          labels={TRANSMISSION_LABELS}
          value={transmission}
          onChange={setTransmission}
        />
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
