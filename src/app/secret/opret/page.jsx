import OpretEventClient from "./OpretEventClient";
import { getLocations } from "@/api/page";

export default async function Page() {
  const locations = await getLocations();
  return <OpretEventClient locations={locations} />;
}
