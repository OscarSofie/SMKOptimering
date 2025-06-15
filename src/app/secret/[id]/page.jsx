"use client";
import { useState, useEffect } from "react";
import RedigerEventForm from "@/app/components/kurator/RedigerEventForm";
import AllArtworks from "@/app/components/kurator/AllArtworks";
import RedigerArtworks from "@/app/components/kurator/RedigerArtworks";
import { getSingleArtwork } from "@/api/page";
import { getLocations } from "@/api/locations";
import { use } from "react";

export default function Page({ params }) {
  const { id } = use(params);

  const [event, setEvent] = useState(null);
  const [locations, setLocations] = useState(null);
  const [artworks, setArtworks] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event
  useEffect(() => {
    setLoading(true);
    fetch(`https://eksamenso.onrender.com/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch(() => setError("Fejl ved hentning af event"));
  }, [id]);

  // Fetch locations
  useEffect(() => {
    getLocations()
      .then(setLocations)
      .catch(() => setError("Fejl ved hentning af locations"));
  }, []);

  // Fetch artworks for event
  useEffect(() => {
    if (event && event.artworkIds) {
      getSingleArtwork(event.artworkIds)
        .then(setArtworks)
        .catch(() => setError("Fejl ved hentning af artworks"));
    }
  }, [event]);

  // Sæt initial selectedLocationId når event er loaded
  useEffect(() => {
    if (event && event.location && event.location.id) {
      setSelectedLocationId(String(event.location.id));
    }
  }, [event]);

  useEffect(() => {
    if (event && locations && artworks) setLoading(false);
  }, [event, locations, artworks]);

  if (error) return <div>Der opstod en fejl ved indlæsning...</div>;
  if (loading || !event || !locations || !artworks)
    return <div>Indlæser...</div>;

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <h1 className="text-2xl-fluid font-extrabold leading-tight text-center">
        Rediger Event
      </h1>

      <RedigerArtworks artworks={artworks} />

      <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-0 lg:gap-x-12 mx-auto">
        <div>
          <RedigerEventForm
            event={event}
            locations={locations}
            selectedLocationId={selectedLocationId}
            setSelectedLocationId={setSelectedLocationId}
            onLocationChange={setSelectedLocationId}
          />
        </div>

        <div className="flex-1 flex flex-col gap-10">
          <AllArtworks
            locations={locations}
            selectedLocationId={selectedLocationId}
          />
        </div>
      </div>
    </div>
  );
}
