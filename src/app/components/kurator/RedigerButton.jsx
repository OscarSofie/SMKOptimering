"use client";

import Link from "next/link";
import Button from "../Button";

const RedigerButton = ({ event }) => {
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
