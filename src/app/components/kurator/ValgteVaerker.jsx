"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useZustand } from "@/store/zustand";

const ValgteVaerker = ({ maxArtworks }) => {
  const { artworks, removeArtwork, clearArtworks } = useZustand();

  useEffect(() => {
    return () => {
      clearArtworks();
    };
  }, [clearArtworks]);

  return (
    <div className="flex flex-col justify-center gap-6 px-6 py-4 border-y-3  mb-4">
      <h2 className="text-xl-fluid font-extrabold leading-tight">
        Valgte værker: {artworks.length}
        {maxArtworks &&  (
          <span className="text-base-fluid font-normal ml-2">
            / {maxArtworks} mulige
          </span>
        )}
      </h2>
      
      {maxArtworks > 0 && artworks.length > maxArtworks && (
        <div className="text-red-600 font-semibold mb-2">
          Du har valgt for mange værker til denne lokation!
        </div>
      )}

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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