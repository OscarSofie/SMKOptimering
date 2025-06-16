import RedigerEventClient from "./RedigerEventClient";
import { getSingleArtwork, getLocations } from "@/api/page";

export default async function Page({ params }) {
  // Server-side data fetching
  const eventRes = await fetch(`https://eksamenso.onrender.com/events/${params.id}`);
  const event = await eventRes.json();
  const locations = await getLocations();
  const artworks = event.artworkIds ? await getSingleArtwork(event.artworkIds) : [];

  return <RedigerEventClient event={event} locations={locations} artworks={artworks} />;
}
