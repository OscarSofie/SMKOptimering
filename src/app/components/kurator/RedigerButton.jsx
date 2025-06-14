"use client";

import Link from "next/link";
import Button from "../Button";

const RedigerButton = ({ event }) => {
  return (
    <Link href={`/secret/${event.id}`}>
      <Button variant="third">Rediger event</Button>
    </Link>
  );
};

export default RedigerButton;

//
