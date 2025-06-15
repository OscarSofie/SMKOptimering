"use client";

import { useZustand } from "@/store/zustand";
import { redigerEvent } from "@/actions/actions";
import SubmitButton from "./SubmitButton";

export default function RedigerEventForm({ event }) {
  const { artworks } = useZustand();
  const artworkIds = artworks.map((art) => art.object_number);

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
        defaultValue={event.location?.name}
      >
      <option value="">Vælg lokation</option>
        <option value="1">Kunsthallen A, 2100 Kbh</option>
        <option value="2">Galleri B, 8000 Aarhus</option>
        <option value="3">Warehouse C, 5000 Odense</option>
        <option value="4">Kunstforeningen D, 1401 København K</option>
        <option value="5">Studio E, 9000 Aalborg</option>
        <option value="6">Kunstlab F, 6700 Esbjerg</option>
        <option value="7">Kulturhuset G, 4600 Køge</option>
        <option value="8">Galleriet H, 8600 Silkeborg</option>
        <option value="9">Kunstrum I, 2800 Lyngby</option>
        <option value="10">Værkstedet J, 7500 Holstebro</option>
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
