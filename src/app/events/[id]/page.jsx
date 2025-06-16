import { getSingleArtwork } from "@/api/page";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import RedigerButton from "@/app/components/kurator/RedigerButton";
import DeleteButton from "@/app/components/kurator/DeleteButton";
import { sletEvent } from "@/actions/actions";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Button from "@/app/components/Button";

const SingleEvent = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`https://eksamenso.onrender.com/events/${id}`);
  const event = await res.json();

  const [heroArt] = await getSingleArtwork(event.artworkIds?.[0]);
  const artworks = await getSingleArtwork(event.artworkIds);

  return (
    <div className="text-kurator-primary md:mt-10 mt-6 px-1 md:px-16">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/events">Udstillinger</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/events/${id}`}>
              {event.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/*       <div className="relative h-[75vh] w-full flex items-center justify-center mt-6 border-b-1">
        <Image
          src={heroArt?.image_thumbnail || "/img/placeholder.svg"}
          alt="Kunstværk"
          fill
          
          className="w-full h-auto object-contain pb-0 md:pb-10"
        />
      </div> */}

      <div className="text-left text-kurator-primary px-1 md:px-16 py-2 md:py-16 space-y-5 mt-10 md:mt-0">
        <h1 className="text-4xl md:text-6xl font-extrabold">{event.title}</h1>
        <p className="text-md-fluid max-w-screen-md italic md:mt-10 mt-2 md:mb-6 mb-4">
          {event.description}
        </p>
        <div className="flex justify-start gap-6 text-base-fluid pb-6 md:pb-0">
          <span>{event.date}</span>
          <span>|</span>
          <span>{event.location?.name}</span>
          <span>|</span>
          <span>{event.location?.address}</span>
        </div>
      </div>
      <div className=" pt-8 pb-8 px-1 md:px-20 flex flex-row gap-4">
        <SignedOut>
          <Link href={`/tilmelding/${event.id}`}>
            <Button variant="third">Tilmeld dig eventet</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <RedigerButton event={event} />
          <form action={sletEvent}>
            <input type="hidden" name="eventId" value={event.id} />
            <DeleteButton>Slet event</DeleteButton>
          </form>
        </SignedIn>
      </div>

      <div className="px-1 md:px-20 py-12 border-t">
        <h2 className="text-2xl-fluid font-bold text-kurator-primary mb-4">
          Værker til eventet:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="transition-transform duration-300 hover:scale-105"
            >
              <Link
                href={{
                  pathname: `/artworks/${encodeURIComponent(
                    art.object_number
                  )}`,
                  query: {
                    eventId: event.id,
                    eventName: event.title,
                  },
                }}
              >
                <Image
                  src={art.image_thumbnail}
                  alt="Kunstværk"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
                <p>Se kunstværk →</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
