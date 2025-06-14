"use server";

import { redirect } from "next/navigation";
import { createEvent } from "@/api/page";
import { deleteEvent } from "@/api/page";
import { updateEvent } from "@/api/page";
import { getEvents } from "@/api/page";

export async function opretEvent(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const curator = formData.get("curator");
  const date = formData.get("date");
  const locationId = formData.get("locationId");
  const artworkIdsString = formData.get("artworkIds");
  const artworkIds = JSON.parse(artworkIdsString || "[]");

  // Prompt: Hvordan tjekker jeg om nogle IDs allerede er brugt i en bestemt kontekst?
  const events = await getEvents();
  const notAvailable = events.some(
    (event) =>
      event.date === date &&
      event.artworkIds?.some((artworkId) => artworkIds.includes(artworkId))
  );

  if (notAvailable) {
    throw new Error("Et eller flere værker er allerede valgt til denne dato.");
  }

  const data = {
    title,
    description,
    curator,
    date,
    locationId,
    artworkIds,
  };

  console.log("Sender data til createEvent:", artworkIds);

  const newEvent = await createEvent(data);

  redirect(`/events/${newEvent.id}`);
}

export async function redigerEvent(formData) {
  const id = formData.get("id");
  const title = formData.get("title");
  const description = formData.get("description");
  const curator = formData.get("curator");
  const date = formData.get("date");
  const locationId = formData.get("locationId");
  const artworkIdsString = formData.get("artworkIds");
  const artworkIds = JSON.parse(artworkIdsString || "[]");

  const events = await getEvents();
  const notAvailable = events.find(
    (event) =>
      event.id !== id &&
      event.date === date &&
      event.locationId === locationId &&
      event.artworkIds?.some((artworkId) => artworkIds.includes(artworkId))
  );

  if (notAvailable) {
    throw new Error(
      "Et eller flere valgte værker er allerede brugt på den dato."
    );
  }

  const updatedData = {};

  if (title) updatedData.title = title;
  if (description) updatedData.description = description;
  if (curator) updatedData.curator = curator;
  if (date) updatedData.date = date;
  if (locationId) updatedData.locationId = locationId;
  if (artworkIds.length > 0) updatedData.artworkIds = artworkIds;

  await updateEvent(id, updatedData);
  redirect(`/events/${id}`);
}

export async function sletEvent(formData) {
  const id = formData.get("eventId");
  await deleteEvent(id);

  redirect("/events");
}
