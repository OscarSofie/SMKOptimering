"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button from "../Button";

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const textColor = isHome ? "text-white" : "text-kurator-primary";

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
          <div
            className="fixed inset-0 bg-black/40 z-20"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed top-0 right-0 h-screen sm:w-1/2 w-full border-l-2 bg-white p-6 flex flex-col gap-6 z-50">
            <div className="flex flex-row justify-between items-center">
              <Link href="/" className="text-lg-fluid font-bold">
                SMK<span className="text-red-500">.</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="top-4 right-4 text-3xl text-kurator-primary"
                aria-label="Luk"
              >
                ×
              </button>
            </div>

            <ul className="flex flex-col gap-4 text-kurator-primary text-2xl-fluid mt-10">
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
                  <Button variant="primary">Log ind</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />

                <Link
                  href="/secret/opret"
                  onNavigate={(e) => {
                    e.preventDefault();
                    window.location.href = "/secret/opret";
                  }}
                >
                  <Button variant="primary" onClick={() => setIsOpen(false)}>
                    Opret Event
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Burger;
