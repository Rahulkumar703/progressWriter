import { getServerSession } from "next-auth";
import { H1 } from "./ui/typography";
import UserAvatar from "./userAvatar";
import LoginButton from "./loginButton";
import Wrapper from "./wrapper";
import Link from "next/link";

const Header = async () => {
  const session = await getServerSession();

  return (
    <header className="sticky top-0 bg-background h-20 shadow-lg">
      <Wrapper className={`flex items-center justify-between`}>
        <Link href={"/"}>
          <H1 className="font-bold">
            <span className="text-purple-400">P</span>rogress
          </H1>
        </Link>
        {session?.user ? <UserAvatar user={session.user} /> : <LoginButton />}
      </Wrapper>
    </header>
  );
};

export default Header;
