import Image from "next/image";
import { fetchSomeArtworks } from "@/api/page";
import ValgteVaerker from "./ValgteVaerker";
import SearchArt from "./SearchArt";

const AllArtworks = async () => {
  const vaerker = await fetchSomeArtworks();

  return (
    <div>
      <ValgteVaerker />
      <SearchArt alleVaerker={vaerker} />
    </div>
  );
};

export default AllArtworks;
