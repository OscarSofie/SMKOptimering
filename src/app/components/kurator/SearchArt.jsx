"use client";

import { useState } from "react";
import { getSearchResults } from "@/api/page";
import { useZustand } from "@/store/zustand";
import Image from "next/image";

const SearchArt = ({ alleVaerker = [] }) => {
  const { artworks, addArtwork, removeArtwork } = useZustand();

  const [searchQuery, setsearchQuery] = useState("");

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const prSide = 30;

  // Prompt: Hvordan laver jeg en søgefunktion der kalder et API og viser resultater? (uden useEffect)
  const soegVaerker = async () => {
    if (!searchQuery.trim()) return;
    const data = await getSearchResults(searchQuery);
    setResults(data);
    setPage(1);
  };

  //v Prompt: Jeg skal lave en funktion der kan tilføje og fjerne et værk, det skal ske igennem objekts id.
  const klikCheckbox = (item) => {
    const id = encodeURIComponent(item.object_number);
    const isSelected = artworks.some((art) => art.object_number === id);
    isSelected ? removeArtwork(id) : addArtwork(item);
  };

  const kunstListe = (searchQuery ? results : alleVaerker).filter(
    (item) => item.image_thumbnail
  );

  //
  const antalSider = Math.ceil(kunstListe.length / prSide);
  const side = kunstListe.slice((page - 1) * prSide, page * prSide);

  return (
    <div className="flex flex-col gap-6 px-6 py-4 mb-2">
      <div className="flex gap-4">
        <input
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
          placeholder="Søg i SMK API"
          className="border border-kurator-primary px-4 py-2 text-sm-fluid leading-normal"
        />
        <button
          type="button"
          onClick={soegVaerker}
          className="btn-kurator btn-kurator:hover border border-kurator-primary font-semibold px-4 py-2 "
        >
          Søg
        </button>
      </div>

      {kunstListe.length > 0 && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {side.map((item) => (
            <li
              key={encodeURIComponent(item.object_number)}
              className="flex flex-col"
            >
              <div className="relative w-full aspect-square overflow-hidden border border-kurator-primary">
                <Image
                  src={item.image_thumbnail || "/img/placeholder.svg"}
                  alt="Artwork"
                  fill
                  className="object-cover"
                />

                <label className="absolute right-3 top-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={artworks.some(
                      (art) =>
                        art.object_number ===
                        encodeURIComponent(item.object_number)
                    )}
                    onChange={() => klikCheckbox(item)}
                    className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer border border-kurator-primary "
                  />
                </label>
              </div>

              <div className="mt-2">
                <p className="font-semibold text-sm-fluid leading-tight">
                  {item.titles?.[0]?.title || item.object_number}
                </p>
                <p className="text-xs-fluid text-kurator-secondary">
                  {item.artist || "Ukendt kunstner"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center items-center gap-6 mt-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="text-kurator-primary disabled:opacity-30"
        >
          Forrige
        </button>
        <span className="text-sm-fluid mt-1">
          Side {page} af {antalSider}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, antalSider))}
          disabled={page === antalSider}
          className="text-kurator-primary disabled:opacity-30"
        >
          Næste
        </button>
      </div>
    </div>
  );
};

export default SearchArt;
