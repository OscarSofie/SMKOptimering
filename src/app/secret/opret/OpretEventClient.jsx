"use client";
import { useState } from "react";
import OpretEventForm from "@/app/components/kurator/OpretEventForm";
import AllArtworks from "@/app/components/kurator/AllArtworks";

export default function OpretEventClient({ locations }) {
  const [selectedLocationId, setSelectedLocationId] = useState("");

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <h1 className="text-2xl-fluid font-extrabold leading-tight text-center">
        Opret Event
      </h1>

      <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-0 lg:gap-x-12 mx-auto">
        <div>
          <OpretEventForm locations={locations} onLocationChange={setSelectedLocationId} />
        </div>
        <div className="flex-1">
          <AllArtworks
            locations={locations}
            selectedLocationId={selectedLocationId}
            disableArtSelection={!selectedLocationId}
          />
        </div>
      </div>
    </div>
  );
}
