"use client";

import Image from "next/image";
import { useZustand } from "@/store/zustand";

const ValgteVaerker = () => {
  const { artworks, removeArtwork } = useZustand();

  return (
    <div className="flex flex-col justify-center gap-6 px-6 py-4 border-y-3  mb-4">
      <h2 className="text-xl-fluid font-extrabold leading-tight">
        Valgte værker:
      </h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {artworks.map((item) => (
          <li key={item.object_number} className="flex flex-col">
            <div className="relative w-full aspect-square overflow-hidden border border-kurator-primary">
              <Image
                src={item.image_thumbnail || "/img/placeholder.svg"}
                alt="Artwork"
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-2">
              <p className="font-semibold text-sm-fluid leading-tight">
                {item.titles?.[0]?.title || item.object_number}
              </p>

              <p className="text-xs-fluid text-kurator-secondary">
                {item.artist || "Ukendt kunstner"}
              </p>

              <button
                onClick={() => removeArtwork(item.object_number)}
                className="mt-1 text-xs-fluid text-red-500 hover:text-red-800"
              >
                Fjern
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValgteVaerker;
