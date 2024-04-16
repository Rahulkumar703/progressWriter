"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  const { data } = useSession();
  useEffect(() => {
    const logout = async () => {
      await signOut();
      router.replace("/auth/login");
    };
    data ? logout() : router.replace("/auth/login");
  }, [router, data]);

  return null;
};

export default LogoutPage;
