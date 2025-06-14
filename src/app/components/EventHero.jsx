import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { SignedOut } from "@clerk/nextjs";

const EventHero = ({ event, heroImage, eventButton = false }) => {
  return (
    <section className="w-full text-kurator-primary px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start max-w-screen-xl mx-auto">
        <div className="w-full  flex items-center justify-center">
          <div
            className="relative  "
            style={{ backgroundColor: event.bgColor || "#000" }}
          >
            <Image
              src={heroImage}
              alt={event.title}
              height={700}
              width={700}
              className="object-contain p-10 aspect-square overflow-hidden "
            />
          </div>
        </div>

        <div className="flex flex-col justify-center w-full space-y-6 px-2">
          <p className="text-sm-fluid leading-tight tracking-wide uppercase">
            Udstilling
          </p>
          <h2 className="text-3xl-fluid font-extrabold leading-tight">
            {event.title}
          </h2>
          <p className="text-base-fluid text-kurator-primary leading-normal">
            {event.description}
          </p>
          {eventButton && (
            <Link href={`/events/${event.id}`}>
              <Button variant="primary">Se event</Button>
            </Link>
          )}
          <SignedOut>
            <Link href={`/tilmelding/${event.id}`}>
              <Button variant="third">Tilmeld dig eventet</Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </section>
  );
};

export default EventHero;
