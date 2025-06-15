"use client";

import { useZustand } from "@/store/zustand";
import { redigerEvent } from "@/actions/actions";
import SubmitButton from "./SubmitButton";
import { useState, useEffect } from "react";
import { getLocations } from "@/api/locations";

export default function RedigerEventForm({ event }) {
  const { artworks } = useZustand();
  const artworkIds = artworks.map((art) => art.object_number);
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState(
    event.location?.id ? String(event.location.id) : ""
  );

  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  return (
    <form
      action={redigerEvent}
      className="sticky top-20 self-start p-6 border-3 border-[var(--color-kurator-primary)] bg-[var(--color-kurator-bg)] text-[var(--color-kurator-primary)] flex flex-col gap-4"
    >
      <input type="hidden" name="id" value={event.id} />

      <h2 className="font-extrabold text-[var(--text-xl)] leading-[var(--leading-tight)] mb-2">
        Rediger event
      </h2>

      <input
        type="text"
        name="title"
        defaultValue={event.title}
        required
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
      />

      <textarea
        name="description"
        defaultValue={event.description}
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
      ></textarea>

      <input
        type="text"
        name="curator"
        defaultValue={event.curator}
        required
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
      />

      <select
        name="locationId"
        required
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
        value={selectedLocationId}
        onChange={(e) => setSelectedLocationId(e.target.value)}
      >
        <option value="">Vælg lokation</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      <select
        name="date"
        required
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
        defaultValue={event.date}
      >
        <option value="">{event.date}</option>
        {[
          "2025-05-01",
          "2025-05-02",
          "2025-05-03",
          "2025-05-04",
          "2025-05-05",
          "2025-05-06",
          "2025-05-07",
          "2025-05-08",
          "2025-05-09",
          "2025-05-10",
          "2025-05-11",
          "2025-05-12",
          "2025-05-13",
          "2025-05-14",
          "2025-05-15",
        ].map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <input
        type="hidden"
        name="artworkIds"
        value={JSON.stringify(artworkIds)}
      />

      <SubmitButton className="btn-kurator hover:btn-kurator text-[var(--text-sm)] px-4 py-2 font-semibold leading-[var(--leading-tight)]">
        Gem event
      </SubmitButton>
    </form>
  );
}
