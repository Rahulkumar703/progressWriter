import { getProject, getProjects } from "@/actions/project";
import GoToTop from "@/components/goToTop";
import NotFoundCard from "@/components/notFoundCarrd";
import { Button } from "@/components/ui/button";
import { H1, H4 } from "@/components/ui/typography";
import Wrapper from "@/components/wrapper";
import { trim } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params, searchParams }) {
  const data = await getProject(searchParams.id);

  return {
    title: data.project ? data.project.name : "Not Found",
    description: data.project
      ? data.project.description
      : "Project has been removed or made private.",
  };
}

const ProjectPage = async ({ params, searchParams }) => {
  const data = await getProject(searchParams.id);
  const project = data.project;

  return (
    <Wrapper className={"mt-20"}>
      {!project ? (
        <NotFoundCard
          title={"Project Not Found"}
          message={"Either Project has been removed or made private."}
        />
      ) : (
        <div className="flex flex-col gap-6 mt-5">
          <div className="flex justify-between items-center sticky top-2 mt-5">
            <div className="">
              <H1 className={""}>{trim(project.name, 20)}</H1>
              <H4 className={"text-muted-foreground font-medium"}>
                {trim(project.description, 30) || "No Description"}
              </H4>
            </div>
            <Button>
              <Link href={"/"} className="flex items-center">
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:block">Add Todays Progress</span>
              </Link>
            </Button>
          </div>
          <div className="mt-5 ">
            <p className="w-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis quia perspiciatis quae, facilis, id laudantium nostrum
              distinctio adipisci possimus consequuntur minus! Quam minus
              deleniti quo laudantium modi. Quaerat, cumque illo.
            </p>
            <p className="w-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis quia perspiciatis quae, facilis, id laudantium nostrum
              distinctio adipisci possimus consequuntur minus! Quam minus
              deleniti quo laudantium modi. Quaerat, cumque illo.
            </p>
          </div>
        </div>
      )}
      <GoToTop />
    </Wrapper>
  );
};

export default ProjectPage;
