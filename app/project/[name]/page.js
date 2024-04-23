import { getProject } from "@/actions/project";
import GoToTop from "@/components/goToTop";
import NotFoundCard from "@/components/notFoundCarrd";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { H1, H4, P, Quote } from "@/components/ui/typography";
import Wrapper from "@/components/wrapper";
import { trim } from "@/lib/helper";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ProjectMembers from "@/components/projectMembers";
import EditProject from "@/components/editProject";
import AddProgress from "@/components/addProgress";

export async function generateMetadata({ searchParams }) {
  const data = await getProject(searchParams.id);

  return {
    title: data.project ? data.project.name : "Not Found",
    description: data.project
      ? data.project.description
      : "Project has been removed or made private.",
  };
}

const ProjectPage = async ({ searchParams }) => {
  const session = await getServerSession(options);
  const data = await getProject(searchParams.id);
  const project = data.project;

  const isLoggedInUserAdmin = project.members.find(
    (member) => member.user._id?.toString() === session?.user._id?.toString()
  )?.admin;

  return (
    <Wrapper className={"mt-20"}>
      {project ? (
        <div className="flex flex-col gap-6 mt-5 bg-background ">
          <div className="flex justify-between items-center ">
            <div className="">
              <div className="flex gap-2 items-center">
                <H1 className={"xs:text-2xl text-base md:text-3xl"}>
                  {trim(project.name, 12)}
                </H1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full w-5 h-5 md:w-8 md:h-8"
                    >
                      <Info className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-screen overflow-y-auto">
                    <DialogHeader>
                      {/* <DialogTitle className="capitalize"> */}
                      <H1>{project.name}</H1>
                      {/* </DialogTitle> */}
                      <DialogDescription asChild>
                        <div className="text-base ">
                          <P className={"text-muted-foreground"}>
                            {project.description || "No Description"}
                          </P>
                          <Quote className={"text-foreground"}>
                            Created on :{" "}
                            {new Date(project.createdAt).toDateString()}
                          </Quote>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    {isLoggedInUserAdmin && (
                      <EditProject
                        id={project._id.toString()}
                        name={project.name}
                        description={project.description}
                        visibility={project.visibility}
                      />
                    )}
                    <ScrollArea className="h-72 w-full rounded-md mt-6">
                      <div className="flex flex-col gap-2">
                        <ProjectMembers
                          projectId={project._id.toString()}
                          inviteLink={project.inviteLink}
                          members={JSON.stringify(project.members)}
                          loggedInUser={JSON.stringify(session.user)}
                        />
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <H4
                    className={
                      "text-muted-foreground font-medium capitalize text-xs md:text-base"
                    }
                  >
                    {trim(project.description, 50) || "No Description"}
                  </H4>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="capitalize max-w-80 w-full">
                    {project.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <AddProgress projectId={project._id.toString()} />
          </div>
          <div className="mt-5 "></div>
        </div>
      ) : (
        <NotFoundCard
          title={"Project Not Found"}
          message={"Either Project has been removed or made private."}
        />
      )}
      <GoToTop />
    </Wrapper>
  );
};

export default ProjectPage;
