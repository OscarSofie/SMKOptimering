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
import { useZustand } from "@/store/zustand";

export default function RedigerArtworks({ artworks }) {
  const { addArtwork, artworks: current, clearArtworks } = useZustand();
  // Sæt artworks kun første gang hvis current er tom
  if (artworks.length > 0 && current.length === 0) {
    clearArtworks();
    artworks.forEach((art) => addArtwork(art));
  }
  return null;
}
