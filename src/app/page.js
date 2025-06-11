import Link from "next/link";
import { getEvents, getSingleArtwork } from "@/api/page";
import EventHero from "../app/components/EventHero";
import Button from "../app/components/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Hero from "./components/Hero";
import Header from "./components/layout/Header";

export default async function Home() {
  const allEvents = await getEvents();
  const sliderEvents = allEvents
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

    console.log(allEvents)

  const heroEvents = await Promise.all(
    sliderEvents.map(async (event) => {
      const [artwork] = await getSingleArtwork(event.artworkIds?.[0]);
      return {
        ...event,
        heroImage: artwork?.image_thumbnail || "/img/placeholder.svg",
        bgColor: artwork?.suggested_bg_color || "#fff",
      };
    })
  );



  return (
    <div>
      <div className="bg-img min-h-dvh">

        <Hero />
      </div>
      <main>
        <div className="px-6 md:px-16 py-12 bg-[#C6DDED]">
          <Carousel className="w-full">
            <CarouselContent>
              {heroEvents.map((event) => (
                <CarouselItem
                  key={event.id}

                >
                  <EventHero
                    event={event}
                    heroImage={event.heroImage}
                    eventButton
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>

      </main>
    </div>
  );
}
