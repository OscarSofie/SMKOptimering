"use client";

import { useState } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Button from "../Button";
import Burger from "./Burger";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === "/";
  const hideHeader =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (hideHeader) return null;

  const navClass = `flex items-center justify-between w-full z-50 px-4 sm:px-8 lg:px-16 py-4 ${
    isHome
      ? " absolute top-0 left-0 right-0 bg-transparent text-white"
      : " text-kurator-primary border-b border-text-kurator-primary"
  }`;

  return (
    <nav className={`${navClass}`}>
      <div className="text-2xl-fluid font-extrabold">
        <Link href="/">
          SMK<span className="text-red-500">.</span>
        </Link>
      </div>
      <ul className="flex flex-row gap-4  sm:xs-fluid lg:xl-fluid">
        <li className=" hover:underline">
          <Link href="/events" >
            Udstillinger
          </Link>
        </li>
        <li className=" hover:underline">
          <Link href="/about" >
            Om SMK
          </Link>
        </li>
      </ul>
      <div className="flex flex-row gap-4">
        <SignedOut>
          <SignInButton>
            <Button variant="secondary">Log ind</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />

          <Link href="/secret/opret">
            <Button variant="secondary" >Opret Event</Button>
          </Link>
        </SignedIn>
      </div>

      {/* <div>
        <Burger />
      </div> */}
    </nav>
  );
};

export default Header;
