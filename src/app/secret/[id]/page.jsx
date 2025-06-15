"use client";
import useSWR from "swr";
import RedigerEventForm from "@/app/components/kurator/RedigerEventForm";
import AllArtworks from "@/app/components/kurator/AllArtworks";

import { getSingleArtwork } from "@/api/page";
import { getLocations } from "@/api/locations";

import RedigerArtworks from "@/app/components/kurator/RedigerArtworks";
import { useState, useEffect } from "react";
import { use } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page({ params }) {
  const { id } = use(params);
  const [selectedLocationId, setSelectedLocationId] = useState("");

  // Fetch event data
  const { data: event, error: eventError } = useSWR(
    id ? `https://eksamenso.onrender.com/events/${id}` : null,
    fetcher
  );

  // Fetch locations
  const { data: locations, error: locationsError } = useSWR(
    "https://eksamenso.onrender.com/locations",
    fetcher
  );

  // Fetch artworks for event
  const { data: artworks, error: artworksError } = useSWR(
    event && event.artworkIds
      ? ["artworks", event.artworkIds]
      : null,
    async ([, ids]) => getSingleArtwork(ids)
  );

  // Når event og locations er loaded, sæt initial selectedLocationId hvis ikke allerede sat
  useEffect(() => {
    if (event && event.location && event.location.id && !selectedLocationId) {
      setSelectedLocationId(String(event.location.id));
    }
  }, [event, selectedLocationId]);

  if (eventError || locationsError || artworksError)
    return <div>Der opstod en fejl ved indlæsning...</div>;
  if (!event || !locations || !artworks) return <div>Indlæser...</div>;

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <h1 className="text-2xl-fluid font-extrabold leading-tight text-center">
        Rediger Event
      </h1>

      <RedigerArtworks artworks={artworks} />

      <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-0 lg:gap-x-12 mx-auto">
        <div>
          <RedigerEventForm event={event} locations={locations} onLocationChange={setSelectedLocationId} />
        </div>

        <div className="flex-1 flex flex-col gap-10">
          <AllArtworks locations={locations} selectedLocationId={selectedLocationId} />
        </div>
      </div>
    </div>
  );
}
