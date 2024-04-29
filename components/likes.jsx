"use client";
import { ChevronDown, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { likeProgress } from "@/actions/progress";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserAvatar from "./userAvatar";
import { ScrollArea } from "./ui/scroll-area";

const Likes = ({ progressId, isLiked, likes: likesArray }) => {
  const [isPending, startTransition] = useTransition();

  const likes = JSON.parse(likesArray);
  const addlike = async () => {
    startTransition(async () => {
      try {
        const data = await likeProgress(progressId);
        // toast[data.type](data.message);
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <div className="flex flex-col gap-4 max-w-16">
      <Button
        variant="outline"
        type="button"
        onClick={addlike}
        title="like"
        disabled={isPending}
      >
        <Heart
          className={`w-5 h-5 ${
            isLiked ? "fill-purple-500 text-purple-400" : ""
          }`}
        />
      </Button>
      {likes.length ? (
        <Dialog>
          <DialogTrigger>
            <div className="flex gap-1 max-w-64 pl-3 items-center">
              {likes.slice(0, 3).map((user) => {
                return (
                  <UserAvatar
                    key={user._id}
                    user={user}
                    className={
                      "w-7 h-7 -ml-3 border-2 border-background relative "
                    }
                  />
                );
              })}

              {likes.length > 3 ? (
                <span className="w-7 h-7 bg-primary rounded-full shrink-0 text-white grid place-items-center border-2 border-background text-xs font-bold relative -ml-3">
                  {`+${likes.length - 3}`}
                </span>
              ) : null}
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Likes</DialogTitle>
              <DialogDescription asChild>
                <ScrollArea className="h-96 w-full rounded-md border px-2 pb-2">
                  {likes.map((user) => {
                    return (
                      <div
                        className="flex gap-2 mt-2 items-center"
                        key={user._id}
                      >
                        <UserAvatar
                          user={user}
                          className={"w-10 h-10 border-2 border-background"}
                        />
                        <div className="flex flex-col justify-center items-start">
                          <p className="capitalize text-foreground leading-[12px]">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        <span className="ml-auto">
                          <Heart
                            className={`w-6 h-6 fill-purple-500 text-purple-400`}
                          />
                        </span>
                      </div>
                    );
                  })}
                </ScrollArea>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
};

export default Likes;
