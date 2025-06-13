"use client";

import { useState } from "react";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Button from "../Button";
import OpretButton from "../kurator/OpretButton";
import Burger from "./Burger";

const Header = () => {
  const pathname = usePathname();

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
    <nav className={`flex flex-row items-center  ${navClass}`}>
      <div className="text-2xl-fluid font-extrabold ">
        <Link href="/">
          SMK<span className="text-red-500">.</span>
        </Link>
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex flex-row gap-4">
          <li className="hover:underline">
            <Link href="/events">Events</Link>
          </li>
          <li className="hover:underline">
            <Link href="/about">Om SMK</Link>
          </li>
        </ul>
      </div>

      <div className="hidden md:flex flex-row gap-4 items-center ">
        <SignedOut>
          <SignInButton>
            <Button variant={isHome ? "secondary" : "third"}>Log ind</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <Link href="/secret/opret">
            <OpretButton />
          </Link>
        </SignedIn>
      </div>

      <div className="md:hidden">
        <Burger />
      </div>
    </nav>
  );
};

export default Header;
