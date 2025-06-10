"use client";

import { useState } from "react";
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

    //Prompt: Giver det mening at skrive dette om til ternary rendering?
    if (!email.includes("@")) {
      setError("Indtast en gyldig emailadresse");
      return;
    }
    //Kan jeg bruge router.refresh eller andet til at sørge for at siden opdateres når jeg har submittet, så totalTickets og bookedTickets opdateres?
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
              //Giv mig en React onChange-handler til et number-input, som opdaterer en state-variabel med en tal og ikke en tekststreng
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
