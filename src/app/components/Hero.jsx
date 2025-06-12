"use client";
import Button from "./Button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className=" h-[calc(100dvh-80px)] text-white">
      <div className="  min-h-dvh flex items-center px-2 md:px-16">
        <div className=" space-y-6 border-3 mt-[10dvh] h-full border-white p-15 ml-0 sm:ml-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Statens Museum for Kunst
          </h1>
          <div className="leading-loose">
            <p className="text-base-fluid text-white">
              SMK præsenterer sæsonens mest tankevækkende udstillinger
            </p>
            <p className="text-sm-fluid">
              Oplev værker fra hele verdenen året rundt
            </p>
          </div>
          <div className="flex gap-4 text-xl-fluid">
            <Link href="/events">
              <Button variant="secondary">Se udstillinger</Button>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
