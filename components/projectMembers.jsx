"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { H4, Muted, P } from "@/components/ui/typography";
import { LucideFolderCog, Settings } from "lucide-react";
import UserAvatar from "@/components/userAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { makeAdmin, removeAdmin, removeFromProject } from "@/actions/project";
import { toast } from "sonner";
import AddMembers from "./addMembers";

const ProjectMembers = ({
  members: projectMembers,
  loggedInUser: user,
  projectId,
  inviteLink,
}) => {
  const [isPending, startTransition] = useTransition();
  const members = JSON.parse(projectMembers);
  const loggedInUser = JSON.parse(user);
  const isLoggedInUserAdmin = members.find(
    (member) => member.user._id === loggedInUser._id
  )?.admin;
  const makeAnAdmin = (_id) => {
    startTransition(async () => {
      try {
        const data = await makeAdmin(_id, projectId);
        toast[data.type](data.message);
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  const removeAsAdmin = (_id) => {
    startTransition(async () => {
      try {
        const data = await removeAdmin(_id, projectId);
        toast[data.type](data.message);
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  const removeMember = (_id) => {
    startTransition(async () => {
      try {
        const data = await removeFromProject(_id, projectId);
        toast[data.type](data.message);
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <H4>Members</H4>
        {isLoggedInUserAdmin ? <AddMembers inviteLink={inviteLink} /> : null}
      </div>
      <div className="flex flex-col gap-2 py-2">
        {members
          .sort((a, b) => {
            // If one member is the logged-in user, prioritize it
            if (a.user._id === loggedInUser._id) return -1;
            if (b.user._id === loggedInUser._id) return 1;

            // Sort by admin status (admins first)
            return b.admin - a.admin;
          })
          .map((member) => {
            return (
              <div
                key={member.user._id}
                className={`${
                  loggedInUser._id.toString() === member.user._id.toString()
                    ? "bg-purple-100"
                    : ""
                } group flex items-center p-2 gap-2 rounded-md cursor-pointer hover:bg-muted transition-colors duration-200 ease-in-out`}
              >
                <UserAvatar user={member.user} />
                <P className={"capitalize [&:not(:first-child)]:mt-0 ml-2"}>
                  {loggedInUser._id.toString() === member.user._id.toString()
                    ? "You"
                    : member.user.name}
                </P>
                <Tooltip>
                  <TooltipTrigger>
                    <Muted className={"ml-2"}>
                      {member.admin ? (
                        <LucideFolderCog className="w-4 h-4 text-purple-600" />
                      ) : (
                        ""
                      )}
                    </Muted>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="capitalize">{"Project Admin"}</p>
                  </TooltipContent>
                </Tooltip>
                {isLoggedInUserAdmin &&
                loggedInUser._id.toString() !== member.user._id.toString() ? (
                  <div className="ml-auto invisible group-hover:visible">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-5 h-5 md:w-8 md:h-8"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {member.admin ? (
                          <DropdownMenuItem className="p-0">
                            <Button
                              onClick={() => removeAsAdmin(member.user._id)}
                              disabled={isPending}
                              size="sm"
                              className="w-full border-0 justify-start"
                              variant="outline"
                            >
                              Remove as Admin
                            </Button>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="p-0">
                            <Button
                              onClick={() => makeAnAdmin(member.user._id)}
                              disabled={isPending}
                              size="sm"
                              className="w-full border-0 justify-start"
                              variant="outline"
                            >
                              Make Admin
                            </Button>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="p-0 ">
                          <Button
                            onClick={() => removeMember(member.user._id)}
                            disabled={isPending}
                            size="sm"
                            className="w-full border-0 hover:bg-destructive hover:text-white"
                            variant="outline"
                          >
                            Remove From Project
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProjectMembers;
