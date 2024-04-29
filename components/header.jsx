import { getServerSession } from "next-auth";
import { H1 } from "./ui/typography";
import UserAvatar from "./userAvatar";
import LoginButton from "./loginButton";
import Wrapper from "./wrapper";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code2, User2 } from "lucide-react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import LogoutBtn from "./logoutBtn";

const Header = async () => {
  const session = await getServerSession(options);
  const user = session?.user;

  return (
    <header className="sticky top-0 bg-background h-20 shadow-lg z-30 flex items-center w-full">
      <Wrapper className={`flex items-center justify-between w-full`}>
        <Link href={"/"}>
          <H1 className="font-bold">
            <span className="text-purple-400">P</span>rogress
          </H1>
        </Link>
        {user?._id ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserAvatar user={session.user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="capitalize text-center">
                H!, {user?.name.split(" ")[0]}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <Link href={"/profile"} className="h-inherit w-full">
                <DropdownMenuItem>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link> */}
              <Link href={"/"} className="h-inherit w-full">
                <DropdownMenuItem>
                  <Code2 className="mr-2 h-4 w-4" />
                  <span>My Projects</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <LogoutBtn />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton />
        )}
      </Wrapper>
    </header>
  );
};

export default Header;
