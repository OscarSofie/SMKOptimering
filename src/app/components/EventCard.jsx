import Link from "next/link";
import { getSingleArtwork } from "@/api/page";
import Image from "next/image";
import Button from "./Button";
import { SignedIn } from "@clerk/nextjs";
import DeleteButton from "./kurator/DeleteButton";
import { sletEvent } from "@/actions/actions";
import RedigerButton from "./kurator/RedigerButton";

const EventCard = async ({
  event,
  title,
  description,
  date,
  image,
  isCurator,
}) => {
  const artworks = await getSingleArtwork(event.artworkIds[0]);

  return (
    <div className=" flex flex-col gap-5 px-4">
      <div>
        <Link href={`/events/${event.id}`}>
          {artworks.map((art) => (
            <div key={art.object_number}>
              <Image
                src={art.image_thumbnail}
                alt={event.title}
                width={200}
                height={200}
                className="w-full aspect-square overflow-hidden object-cover"
              />
            </div>
          ))}
        </Link>
        <h4 className="text-xs-fluid text-(--color-public-text-secondary)  mt-2">
          Udstilling
        </h4>
      </div>

      <div className="flex flex-col text-sm sm:gap-3 mt-0">
        <Link href={`/events/${event.id}`}>
          <h1 className="text-xl-fluid text-kurator-primary leading-tight">
            {event.title}
          </h1>

          <h2 className="text-sm-fluid text-kurator-primary opacity-60 mt-1">
            {event.date}
          </h2>

          <p className="text-kurator-primary font-light mt-4 leading-relaxed">
            {event.description}
          </p>
        </Link>

        <div className="flex flex-col gap-4 mt-4">
          <Link href={`/events/${event.id}`}>
            <Button variant="primary">Læs mere om udstillingen</Button>
          </Link>

          <div className="flex lg:flex-row flex-col gap-4">
            <SignedIn>
              <RedigerButton event={event} />

              <form action={sletEvent}>
                <input type="hidden" name="eventId" value={event.id} />
                <DeleteButton>Slet event</DeleteButton>
              </form>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
