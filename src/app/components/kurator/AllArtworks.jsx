"use client";

import { useState, useEffect } from "react";
import { fetchSomeArtworks } from "@/api/page";
import { getLocations } from "@/api/page";
import ValgteVaerker from "./ValgteVaerker";
import SearchArt from "./SearchArt";

const AllArtworks = ({ selectedLocationId }) => {
  const [vaerker, setVaerker] = useState([]);
  const [locations, setLocations] = useState([]);
  const [maxArtworks, setMaxArtworks] = useState(0);

  useEffect(() => {
    fetchSomeArtworks().then(setVaerker);
    getLocations().then(setLocations);
  }, []);

  useEffect(() => {
    if (!selectedLocationId) {
      setMaxArtworks("0");
      return;
    }
    const loc = locations.find(
      (l) => (l.id) === (selectedLocationId)
    );
    setMaxArtworks(loc?.maxArtworks || "0");
  }, [selectedLocationId, locations]);

  return (
    <div>
      <ValgteVaerker maxArtworks={maxArtworks} />
      <SearchArt maxArtworks={maxArtworks} alleVaerker={vaerker} />
    </div>
  );
};

export default AllArtworks;