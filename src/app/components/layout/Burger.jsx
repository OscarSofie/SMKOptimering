"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "../Button";
import OpretButton from "../kurator/OpretButton";

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const textColor = isHome ? "text-white" : "text-kurator-primary";
  const backgroundColor = isHome ? "bg-kurator-primary" : "bg-white";
  const borderColor = isHome ? "border-white" : "border-kurator-primary";

  return (
    <div className="relative z-[100]">
      <button
        onClick={() => setIsOpen(true)}
        className={`text-2xl px-4 py-2 transition ${textColor}  ${borderColor}`}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {isOpen && (
        <>
          <div className={`fixed top-0 right-0 h-screen w-full p-6 flex flex-col gap-6 ${backgroundColor} ${textColor}`}>
            <div className="flex flex-row justify-between items-center">
         
              <button
                onClick={() => setIsOpen(false)}
                className="top-4 right-4 text-3xl"
                aria-label="Luk"
              >
                ×
              </button>
            </div>

            <ul className={`flex flex-col gap-4 text-2xl-fluid mt-10 ${textColor}`}>
              <li className="border-b pb-2 hover:underline">
                <Link href="/events" onClick={() => setIsOpen(false)}>
                  Udstillinger
                </Link>
              </li>
              <li className="border-b pb-2 hover:underline">
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  Om SMK
                </Link>
              </li>
            </ul>

            <div className="mt-auto flex flex-col gap-4">
              <SignedOut>
                <SignInButton>
                  <Button variant={isHome ? "secondary" : "primary"}>Log ind</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <OpretButton variant="primary" onClick={() => setIsOpen(false)} />
              </SignedIn>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Burger;
