"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    const logout = async () => {
      await signOut();
      router.replace("/auth/login");
    };
    status === "authenticated" ? logout() : router.replace("/auth/login");
  }, [router, status]);

  return null;
};

export default LogoutPage;
