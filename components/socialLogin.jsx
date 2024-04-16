"use client";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";

const SocialLogin = ({ isPending }) => {
  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        className="w-full"
        disabled={isPending}
      >
        <FcGoogle className="w-4 h-4 mr-2" />
        Continue with Google
      </Button>
      <Button
        type="button"
        variant={"outline"}
        className="w-full"
        disabled={isPending}
      >
        <SiGithub className="w-4 h-4 mr-2" />
        Continue with Github
      </Button>
    </>
  );
};

export default SocialLogin;
