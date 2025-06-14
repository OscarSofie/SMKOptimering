// "use client";

// import { useZustand } from "@/store/zustand";

// export default function RedigerArtworks({ artworks }) {
//   const { addArtwork, artworks: current } = useZustand();
//   if (artworks.length > 0 && current.length === 0) {
//     artworks.forEach((art) => addArtwork(art));
//   }

//   return null;
// }

"use client";
import { useEffect } from "react";
import { useZustand } from "@/store/zustand";

// Prompt: Jeg vil gerne have, at nogle data kun renderes én gang, når komponenten loades første gang og ikke hver gang den re-renders.
export default function RedigerArtworks({ artworks }) {
  const { artworks: current, clearArtworks, addArtwork } = useZustand();

  useEffect(() => {
    if (current.length === 0 && artworks.length > 0) {
      clearArtworks();
      artworks.forEach((art) => addArtwork(art));
    }
  }, []);

  return null;
}
