import { getProjects } from "@/actions/project";
import { H1 } from "@/components/ui/typography";
import UnauthenticatedCard from "@/components/unauthenticatedCard";
import Wrapper from "@/components/wrapper";
import Projects from "@/components/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata = {
  title: "My Projects",
  description: "Keep Track of your Project Daily Progress.",
};

export default async function Home() {
  const res = await getProjects();
  const projects = res.projects;

  return (
    <Wrapper className={"min-h-[calc(100vh-12rem)] mt-20"} animate={true}>
      {!res.success ? (
        <UnauthenticatedCard message={res.message} />
      ) : (
        <section className="flex flex-col gap-6 mt-5">
          <H1 className={"my-5"}>My Projects</H1>
          {projects.length ? (
            <Link className="ml-auto" href={"/project/new"}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </Link>
          ) : null}
          <Projects projects={projects} />
        </section>
      )}
    </Wrapper>
  );
}
