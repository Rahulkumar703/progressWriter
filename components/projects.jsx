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

const Projects = ({ projects }) => {
  return (
    <div className="grid xs:grid-cols-[repeat(auto-fit,minmax(300px,1rem))] justify-center gap-4 pb-2">
      {projects.length ? (
        projects.map((project) => {
          return (
            <Link
              key={project.name}
              href={`/project/${project.name}?id=${project._id}`}
            >
              <Card className="border-b-4 border-b-purple-200 shadow-md h-full">
                <CardHeader>
                  <CardTitle className="uppercase">{project.name}</CardTitle>
                  <CardDescription>{`${project.description.slice(0, 30)}${
                    project.description.length > 30 ? "..." : ""
                  }`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 bg-secondary py-3 h-full">
                  <H4>Members</H4>
                  <div className="flex flex-col">
                    {project.members.slice(0, 3).map((member) => {
                      return (
                        <div
                          key={member.user._id}
                          className="flex gap-2 items-center"
                        >
                          <UserAvatar user={member.user} />
                        </div>
                      );
                    })}
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
