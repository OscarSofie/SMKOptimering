import { NextResponse } from "next/server";
import { getSingleEvent } from "@/api/page";

export async function GET(request, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "Missing event id" }, { status: 400 });
  }

  try {
    // Brug getSingleEvent til at hente event-data
    const event = await getSingleEvent(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
