"use client";
import { useRef } from "react";
import { useZustand } from "@/store/zustand";

// Prompt: Jeg vil gerne have, at nogle data kun renderes én gang, når komponenten loades første gang og ikke hver gang den re-renders.
export default function RedigerArtworks({ artworks }) {
  const { artworks: current, clearArtworks, addArtwork } = useZustand();
  const initialized = useRef(false);

  if (!initialized.current && current.length === 0 && artworks.length > 0) {
    initialized.current = true;
    clearArtworks();
    artworks.forEach((art) => addArtwork(art));
  }

  return null;
}
