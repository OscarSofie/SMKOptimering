"use client";
import { useState, useEffect } from "react";
import ValgteVaerker from "./ValgteVaerker";
import SearchArt from "./SearchArt";
import { fetchSomeArtworks } from "@/api/page";

const AllArtworks = ({ locations, selectedLocationId}) => {
  const [vaerker, setVaerker] = useState([]);

  useEffect(() => {
    fetchSomeArtworks().then(setVaerker);
  }, []);

  const maxArtworks = locations.find((l) => l.id === selectedLocationId)?.maxArtworks || 0;
  return (
    <div>
      <ValgteVaerker maxArtworks={maxArtworks} />
      <SearchArt maxArtworks={maxArtworks} alleVaerker={vaerker} />
    </div>
  );
};

export default AllArtworks;