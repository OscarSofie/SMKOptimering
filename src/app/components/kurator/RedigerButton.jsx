"use client";

import Link from "next/link";
import Button from "../Button";
import { useZustand } from "@/store/zustand";

const RedigerButton = ({ event }) => {
  const { clearArtworks } = useZustand;
  return (
    <Link
      href={`/secret/${event.id}`}
      onNavigate={(e) => {
        e.preventDefault();
      }}
    >
      <Button
        onClick={() => (window.location.href = `/secret/${event.id}`)}
        variant="primary"
      >
        Rediger event
      </Button>
    </Link>
  );
};

export default RedigerButton;
