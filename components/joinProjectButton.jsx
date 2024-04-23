"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { addMember } from "@/actions/project";
import { LucideFolderPlus } from "lucide-react";

const JoinProjectButton = ({ projectId }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const joinProject = async () => {
    startTransition(async () => {
      try {
        const data = await addMember(projectId);
        toast[data.type](data.message);
        if (data.type === "success" || data.type === "info")
          router.push(`/project/${data?.project.name}?id=${data?.project._id}`);
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Button className="w-full" onClick={joinProject} disabled={isPending}>
      <LucideFolderPlus className="w-4 h-4 mr-2" />
      Join
    </Button>
  );
};

export default JoinProjectButton;
