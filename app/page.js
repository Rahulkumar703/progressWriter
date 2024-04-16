import { getProjects } from "@/actions/project";
import { H1, H4 } from "@/components/ui/typography";
import UnauthenticatedCard from "@/components/unauthenticatedCard";
import Wrapper from "@/components/wrapper";
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

export default async function Home() {
  const res = await getProjects();
  const projects = res.projects;

  return (
    <Wrapper className={"min-h-[calc(100vh-5rem)]"}>
      {!res.success ? (
        <UnauthenticatedCard message={res.message} />
      ) : (
        <section className="space-y-6">
          <H1 className={"my-10"}>My Projects</H1>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1rem))] gap-4">
            {projects.length ? (
              projects.map((project) => {
                return (
                  <Link key={project._id} href={`/project/${project._id}`}>
                    <Card className="border-b-4 border-b-purple-200 shadow-md h-full">
                      <CardHeader>
                        <CardTitle className="uppercase">
                          {project.name}
                        </CardTitle>
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
                                key={member._id}
                                className="flex gap-2 items-center"
                              >
                                <UserAvatar user={member} />
                                {member.name}
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
              <Card className="border-2 border-dotted border-spacing-14 flex items-center justify-center min-h-40 cursor-pointer hover:bg-purple-50 active:bg-purple-100 transition-all">
                <CardContent className="p-0 font-semibold text-muted-foreground select-none">
                  Create a Project
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}
    </Wrapper>
  );
}
