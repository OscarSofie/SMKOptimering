"use client";

import { useZustand } from "@/store/zustand";
import { opretEvent } from "@/actions/actions";
import SubmitButton from "./SubmitButton";

export default function OpretEventForm() {
  const { artworks } = useZustand();
  const artworkIds = artworks.map((art) => art.object_number);

  return (
    <form
      action={opretEvent}
      className="sticky top-0 bottom-2 self-start p-6 border-3 border-[var(--color-kurator-primary)] bg-[var(--color-kurator-bg)] text-[var(--color-kurator-primary)] flex flex-col  gap-4"
    >
      <h2 className="font-extrabold text-[var(--text-xl)] leading-[var(--leading-tight)] mb-2">
        Opret event
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Titel"
        required
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
      />

      <textarea
        name="description"
        placeholder="Beskrivelse"
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
      ></textarea>

      <input
        type="text"
        name="curator"
        placeholder="Kurator navn"
        required
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
      />

      <select
        name="locationId"
        required
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
      >
        <option value="">Vælg lokation</option>
        <option value="1">Kunsthallen A</option>
        <option value="2">Galleri B</option>
        <option value="3">Warehouse C</option>
        <option value="4">Kunstforeningen D</option>
        <option value="5">Studio E</option>
        <option value="6">Kunstlab F</option>
        <option value="7">Kulturhuset G</option>
        <option value="8">Galleriet H</option>
        <option value="9">Kunstrum I</option>
        <option value="10">Værkstedet J</option>
      </select>

      <select
        name="date"
        required
        className="border border-[var(--color-kurator-primary)] p-2 text-[var(--text-sm)] leading-[var(--leading-normal)]"
      >
        <option value="">Vælg dato</option>
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
        Opret event
      </SubmitButton>
    </form>
  );
}
