import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import UserAvatar from "@/components/userAvatar";
import { H4 } from "./ui/typography";
import { trim } from "@/lib/helper";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Projects = ({ projects }) => {
  return (
    <div className="grid xs:grid-cols-[repeat(auto-fit,minmax(300px,1rem))] justify-center sm:justify-normal  gap-4 pb-2">
      {projects.length ? (
        projects.map((project) => {
          return (
            <Link
              key={project.name}
              href={`/project/${project.name}?id=${project._id}`.replaceAll(
                " ",
                "+"
              )}
            >
              <Card className="border-b-4 border-b-purple-200 shadow-md h-full">
                <CardHeader>
                  <CardTitle className="uppercase">
                    {trim(project.name, 12)}
                  </CardTitle>
                  <CardDescription className="capitalize">
                    {trim(project.description, 50)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 bg-secondary py-3 h-full">
                  <H4>Members</H4>
                  <div className="flex ">
                    {project.members
                      .sort((a, b) => {
                        return b.admin - a.admin;
                      })
                      .slice(0, 3)
                      .map((member, index) => {
                        return (
                          <Tooltip key={member.user._id}>
                            <TooltipTrigger asChild>
                              <div
                                className={`flex gap-2 items-center border-2 border-secondary rounded-full [&:not(:first-child)]:-ml-4 z-[${index}] relative`}
                              >
                                <UserAvatar user={member.user} />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{member.user.name}</p>
                              <p className="lowercase">{member.user.email}</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    {project.members.length > 3 ? (
                      <Badge
                        className={"w-8 h-8 flex items-center justify-center"}
                      >
                        +{project.members.length - 3}
                      </Badge>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })
      ) : (
        <Link href={"/project/new"}>
          <Card className="border-2 border-dotted border-spacing-14 flex items-center justify-center min-h-40 cursor-pointer hover:bg-purple-50 active:bg-purple-100 transition-all">
            <CardContent className="p-0 font-semibold text-muted-foreground select-none">
              Create a Project
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  );
};

export default Projects;
