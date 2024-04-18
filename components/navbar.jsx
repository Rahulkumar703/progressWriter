"use client";
import Wrapper from "./wrapper";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { Breadcrumb } from "./breadcrumb";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  return pathName.startsWith("/auth") ? null : (
    <Wrapper>
      <nav className="flex gap-6 md:gap-10 items-center fixed max-w-[calc(1280px)] w-[calc(100%-1rem)] left-1/2 top-24 -translate-x-1/2 z-10 bg-background shadow-md rounded-full xl h-20 p-4 border">
        <Button
          type="icon"
          variant="outline"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="text-muted-foreground hover:text-foreground" />
        </Button>
        <Breadcrumb />
      </nav>
    </Wrapper>
  );
};

export default Navbar;
