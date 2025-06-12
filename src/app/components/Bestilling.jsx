"use client";
import { useSearchParams } from "next/navigation";

export default function Bestilling() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const orderId = searchParams.get("orderId");

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Tak for din tilmelding</h1>
      <p className="text-xl">Kære {email}, tak for din tilmelding.</p>
      <p>Du vil modtage en ordrebekræftelse på din email.</p>
      <p className="text-md mt-2">
        Din ordrebekræftelse har ID: <strong>{orderId}</strong>
      </p>
    </div>
  );
}
