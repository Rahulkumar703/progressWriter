"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Code } from "@/components/ui/typography";
import { Copy, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const AddMembers = ({ inviteLink }) => {
  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Link Copied");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline" className="w-5 h-5 md:w-8 md:h-8">
          <Plus className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share Project Invitation Link</DrawerTitle>
          <DrawerDescription>
            Share this link with your team members to invite them to join the
            project. Anyone with the link will be able to join the project.
          </DrawerDescription>
        </DrawerHeader>
        <Code className="p-4 w-full overflow-hidden whitespace-nowrap text-ellipsis">
          {inviteLink}
        </Code>
        <DrawerFooter className={"flex-row justify-end"}>
          <DrawerClose asChild>
            <Button variant="outline">
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </DrawerClose>
          <Button onClick={copyInviteLink}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddMembers;
