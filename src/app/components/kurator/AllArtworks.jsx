"use client";
import { useState, useEffect } from "react";
import ValgteVaerker from "./ValgteVaerker";
import SearchArt from "./SearchArt";
import { fetchSomeArtworks } from "@/api/page";

const AllArtworks = ({
  locations = [],
  selectedLocationId = "",
  vaerker = [],
  disableArtSelection = false,
}) => {
  const [fetchedVaerker, setFetchedVaerker] = useState(vaerker);

  useEffect(() => {
    if (vaerker.length === 0) {
      fetchSomeArtworks().then(setFetchedVaerker);
    }
  }, []);

  const maxArtworks =
    locations.find((l) => l.id === selectedLocationId)?.maxArtworks || "0";
  return (
    <div>
      <ValgteVaerker maxArtworks={maxArtworks} />
      <SearchArt
        maxArtworks={maxArtworks}
        alleVaerker={fetchedVaerker}
        disableArtSelection={disableArtSelection}
      />
    </div>
  );
};

export default AllArtworks;
