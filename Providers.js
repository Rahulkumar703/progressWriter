"use client";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "./components/ui/tooltip";
const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  );
};

export default Providers;
