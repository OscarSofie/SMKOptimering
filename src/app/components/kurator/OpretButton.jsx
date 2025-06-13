"use client";
import { usePathname } from "next/navigation";  
import Button from "../Button";

const OpretButton = () => {
  const pathname = usePathname();
   const isHome = pathname === "/";
  return (
      <Button  onClick={() => (window.location.href = "/secret/opret")} variant={isHome ? "secondary" : "third"}>Opret event</Button>
  );
};

export default OpretButton;
