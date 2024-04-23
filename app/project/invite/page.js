import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Wrapper from "@/components/wrapper";
import Link from "next/link";
import jwt from "jsonwebtoken";
import JoinProjectButton from "@/components/joinProjectButton";
import { Home } from "lucide-react";
import { verifyProjectInviteLink } from "@/actions/utils";

export const metadata = {
  title: "Join Project",
  description: "Click on join button to join the project and collaborate.",
};

const JoinProject = async ({ searchParams }) => {
  const token = searchParams.token;

  const res = await verifyProjectInviteLink(token);
  if (res && !res?.isVarified)
    return (
      <Wrapper className={"mt-20"}>
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>{res?.message}</CardTitle>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link href="/" className="inline-block">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </Wrapper>
    );

  const payload = jwt.decode(token, process.env.JWT_SECRET);

  return (
    <Wrapper className={"mt-20"}>
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>{res?.project.name}</CardTitle>
          <CardDescription>{res?.project.description}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <JoinProjectButton projectId={payload.projectID} />
        </CardFooter>
      </Card>
    </Wrapper>
  );
};

export default JoinProject;
