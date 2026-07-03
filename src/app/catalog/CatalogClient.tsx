"use client";

import { useMemo, useState } from "react";
import Filters from "@/components/Filters/Filters";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";
import { useCampers } from "@/hooks/useCampers";
import type { CamperFilters } from "@/types/camper";
import styles from "./catalog.module.css";

export default function CatalogClient() {
  const [filters, setFilters] = useState<CamperFilters>({});

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useCampers(filters);

  const campers = useMemo(
    () => data?.pages.flatMap((page) => page.campers) ?? [],
    [data]
  );

  const showLoader = isLoading || isFetchingNextPage;

  return (
    <div className={`container ${styles.layout}`}>
      {showLoader && <Loader />}

      <Filters initialFilters={filters} onSearch={setFilters} />

      <div className={styles.results}>
        {isError && (
          <p className={styles.error}>
            Something went wrong while loading campers. Please try again.
          </p>
        )}

        {!isLoading && !isError && campers.length === 0 && (
          <p className={styles.empty}>
            No campers match your filters. Try adjusting your search.
          </p>
        )}

        <ul className={styles.list}>
          {campers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </ul>

        {hasNextPage && !isFetchingNextPage && (
          <button
            className={styles.loadMore}
            onClick={() => fetchNextPage()}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
