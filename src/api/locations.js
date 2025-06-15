// Fetches all locations from the backend
export async function getLocations() {
  const res = await fetch("https://eksamenso.onrender.com/locations", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Kunne ikke hente lokationer");
  }
  return await res.json();
}
