"use client";
import { useState, useEffect } from "react";
import RedigerEventForm from "@/app/components/kurator/RedigerEventForm";
import AllArtworks from "@/app/components/kurator/AllArtworks";
import RedigerArtworks from "@/app/components/kurator/RedigerArtworks";
import { getSingleArtwork } from "@/api/page";
import { getLocations } from "@/api/page";
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
   
  }, [id]);

  // Fetch locations
  useEffect(() => {
    getLocations()
      .then(setLocations)
   
  }, []);

  // Fetch artworks for event
  useEffect(() => {
    if (event && event.artworkIds) {
      getSingleArtwork(event.artworkIds)
        .then(setArtworks)
       
    }
  }, [event]);

  // Sæt initial selectedLocationId når event er loaded
  useEffect(() => {
    if (event && event.location && event.location.id) {
      setSelectedLocationId((event.location.id));
    }
  }, [event]);

  useEffect(() => {
    if (event && locations && artworks) setLoading(false);
  }, [event, locations, artworks]);

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