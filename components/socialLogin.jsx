"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { toast } from "sonner";
import { useTransition } from "react";

const SocialLogin = ({ isPending: loading }) => {
  const [isPending, startTransition] = useTransition();
  const socialLogin = (provider) => {
    startTransition(async () => {
      try {
        await signIn(provider);
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <section className="flex gap-2 xs:flex-col w-full">
      <Button
        type="button"
        variant={"outline"}
        className="w-full"
        disabled={loading || isPending}
        onClick={() => socialLogin("google")}
      >
        <FcGoogle className="w-5 h-5 xs:w-4 xs:h-4 mr-2" />
        <span className="hidden xs:block">Continue with Google</span>
      </Button>
      <Button
        type="button"
        variant={"outline"}
        className="w-full"
        disabled={loading || isPending}
        onClick={() => socialLogin("github")}
      >
        <SiGithub className="w-5 h-5 xs:w-4 xs:h-4 mr-2" />
        <span className="hidden xs:block">Continue with Github</span>
      </Button>
    </section>
  );
};

export default SocialLogin;
