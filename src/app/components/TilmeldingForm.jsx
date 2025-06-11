"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { bookTickets } from "@/api/page";
import SubmitButton from "./kurator/SubmitButton";

export default function TilmeldingForm({ event }) {
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(event.bookedTickets);
  const available = event.totalTickets - booked;
  const router = useRouter();

  const generateOrderId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleSubmit = async (mail) => {
    mail.preventDefault();

    if (!email.includes("@")) {
      setError("Indtast en gyldig emailadresse");
      return;
    }
    const newBookedTickets = booked + selectedTickets;
    const orderId = generateOrderId();

    router.refresh();

    try {
      await bookTickets(event.id, {
        bookedTickets: newBookedTickets,
      });

      setBooked(newBookedTickets);

      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orderId, selectedTickets }),
      });

      if (!res.ok) {
        throw new Error("Fejl ved afsendelse af mail");
      }

      router.push(
        `/bestilling?email=${encodeURIComponent(email)}&orderId=${orderId}`
      );
    } catch (err) {
      console.error(err);
      setError("Der opstod en fejl. Prøv igen senere.");
    }
  };

  // Polling for real-time opdatering af ledige billetter
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/events/${event.id}`);
        if (res.ok) {
          const updatedEvent = await res.json();
          setBooked(updatedEvent.bookedTickets);
        }
      } catch (err) {
        // evt. håndter fejl
      }
    }, 30000); // 30 sekunder

    return () => clearInterval(interval);
  }, [event.id]);

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-4xl font-bold">Tilmelding til: {event.title}</h1>
      <p>{event.description}</p>
      <p>
        <strong>Sted:</strong> {event.location?.address}
      </p>
      <p>
        <strong>Dato:</strong> {event.date}
      </p>
      <p>
        <strong>Ledige billetter:</strong> {available}
      </p>

      {available > 0 ? (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            Antal billetter:
            <input
              type="number"
              min="1"
              max={available}
              value={selectedTickets}
              onChange={(e) => setSelectedTickets(Number(e.target.value))}
              className="ml-2 border px-2 py-1 w-20"
            />
          </label>

          <label className="block">
            Din email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="ml-2 border px-2 py-1"
            />
          </label>

          {error && <p className="text-red-600">{error}</p>}

          <SubmitButton >
            Bekræft tilmelding
          </SubmitButton>
        </form>
      ) : (
        <p className="text-red-600 font-bold">
          Der er desværre ingen billetter tilbage.
        </p>
      )}
    </div>
  );
}
