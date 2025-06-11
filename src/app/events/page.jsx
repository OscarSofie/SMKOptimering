import { getEvents } from "@/api/page";
import EventCard from "@/app/components/EventCard";
import DropdownLocations from "@/app/components/DropdownLocations";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const allLocations = {
  1: "København",
  2: "Aarhus",
  3: "Odense",
};

export default async function EventPage() {
 
  const allEvents = await getEvents();
  const eventGroups = { 1: [], 2: [], 3: [] };

  allEvents.forEach((event) => {
    if (eventGroups[event.locationId]) {
      eventGroups[event.locationId].push(event);
    }
  });


  const ifChosenLocation = [];
  for (const id in eventGroups) {
    if (eventGroups[id].length > 0) {
      ifChosenLocation.push({ id, name: allLocations[id] });
    }
  }
  
  const firstAvailableLocationId = ifChosenLocation.length > 0 ? ifChosenLocation[0].id : null;

  return (
    <div className="px-1 sm:px-8 lg:px-20 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/events">Udstillinger</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row justify-between mt-6">
        <h1 className="text-3xl-fluid font-extrabold leading-tight underline">
          Udstillinger
        </h1>
      </div>

      <div className="mt-6 px-1 sm:px-16">
        {ifChosenLocation.map((location) => {
          const locationId = location.id;
          const events = eventGroups[locationId];
          if (events.length === 0) return null;

          return (
            <div key={locationId}>
              <div id={`location-${locationId}`}>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <h1 className="text-2xl-fluid font-extrabold">
                    {allLocations[locationId]}
                  </h1>
                  {locationId === firstAvailableLocationId && (
                    <DropdownLocations locations={ifChosenLocation} />
                  )}
                </div>

                <hr className="my-8 border-t-4 border-kurator-secondary" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="transition-transform duration-300 hover:scale-105"
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>

                <hr className="my-8 border-t-4 border-kurator-secondary" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
