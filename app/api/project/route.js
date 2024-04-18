import { addProject, getProjects } from "@/actions/project";
import { dbConnect } from "@/db/dbConnect";

dbConnect();
export const POST = async (req) => {
  try {
    const reqBody = await req.json();
    const data = await addProject(reqBody);
    return NextResponse.json(data, { status: data.code });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      mesasge: error.mesasge,
      type: "error",
    });
  }
};
export const GET = async (req) => {
  try {
    const data = await getProjectsProject();
    return NextResponse.json(data, { status: data.code });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      mesasge: error.mesasge,
      type: "error",
    });
  }
};
