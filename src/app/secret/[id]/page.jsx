import RedigerEventForm from "@/app/components/kurator/RedigerEventForm";
import { getSingleArtwork } from "@/api/page";
import RedigerArtworks from "@/app/components/kurator/RedigerArtworks";
import AllArtworks from "@/app/components/kurator/AllArtworks";

export default async function Page({ params }) {
  const { id } = params;

  const res = await fetch(`https://eksamenso.onrender.com/events/${id}`, {
    cache: "no-store",
  });
  const event = await res.json();

  const artworks = await getSingleArtwork(event.artworkIds);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <h1 className="text-2xl-fluid font-extrabold leading-tight text-center">
        Rediger Event
      </h1>

      <RedigerArtworks artworks={artworks} />

      <div className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-0 lg:gap-x-12 mx-auto">
        <div>
          <RedigerEventForm event={event} />
        </div>

        <div className="flex-1 flex flex-col gap-10">
          {/* <SearchArt alleVaerker={artworks} /> */}

          <AllArtworks />
        </div>
      </div>
    </div>
  );
}
