"use client";
import { useState, useEffect } from "react";
import RedigerEventForm from "@/app/components/kurator/RedigerEventForm";
import AllArtworks from "@/app/components/kurator/AllArtworks";
import RedigerArtworks from "@/app/components/kurator/RedigerArtworks";

export default function RedigerEventClient({ event, locations, artworks }) {
  const [selectedLocationId, setSelectedLocationId] = useState(event?.location?.id || "");

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
