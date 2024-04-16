import { redirect } from "next/dist/server/api-utils";

const ProjectPage = ({ params }) => {
  if (!params.id) redirect("/");
  console.log(params);
  return <div>ProjectPage</div>;
};

export default ProjectPage;
