"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <DropdownMenuItem
      className="focus:bg-destructive focus:text-white w-full"
      onClick={signOut}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
};

export default LogoutBtn;
