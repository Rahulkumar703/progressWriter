"use client";
import React, { forwardRef } from "react";
import MultipleSelector from "@/components/ui/multiple-selector";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";

const searchUser = async (value, users) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const res = users.filter(
        (data) =>
          data.name.includes(value.toString().toLowerCase()) ||
          data.email.includes(value.toString().toLowerCase())
      );
      resolve(res);
    }, 1000);
  });
};

const UserSelector = forwardRef(({ users, ...props }, ref) => {
  const session = useSession();
  const currentUser = session.data?.user;
  return (
    <div className="flex w-full flex-col gap-5">
      <MultipleSelector
        onSearch={async (value) => {
          const res = await searchUser(value, users);
          return res.filter((user) => user._id !== currentUser?._id);
        }}
        placeholder="Enter member name or email to add them."
        loadingIndicator={
          <div className="py-2 text-center text-lg leading-10 text-muted-foreground flex items-center justify-center">
            <Loader className="animate-spin mr-2 w-6 h-6" />
            Loading...
          </div>
        }
        selectFirstItem={true}
        emptyIndicator={
          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
            No results found.
          </p>
        }
        badgeClassName={"text-lg capitalize"}
        {...props}
      />
    </div>
  );
});
UserSelector.displayName = "UserSelector";
export default UserSelector;
