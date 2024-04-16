"use client";

import { MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LoginButton = ({ size = "default" }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/auth/login")) return null;
  return (
    <Link href={"/auth/login"}>
      <Button size={size} type="button" className="ml-auto">
        Login
        <MdKeyboardArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </Link>
  );
};

export default LoginButton;
