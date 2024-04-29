import { getProgresses } from "@/actions/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import UserAvatar from "./userAvatar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ProgressActions from "./progressActions";
import Likes from "./likes";
import { P } from "./ui/typography";

const Progresses = async ({ projectId }) => {
  const session = await getServerSession(options);
  const userId = session?.user._id.toString();
  const data = await getProgresses(projectId);
  const progresses = data.progresses || [];

  return (
    <section className=" space-y-6">
      {progresses.map((progress) => {
        const isLiked = progress.likes
          .map((like) => like._id.toString())
          .includes(userId.toString());

        const progressOwner = progress.user._id.toString() === userId;

        return (
          <Card key={progress._id} className="shadow-lg">
            <CardHeader>
              <div className="flex gap-4 items-center ">
                <UserAvatar user={progress.user} />
                <div className="">
                  <CardTitle className="capitalize sm:text-2xl text-xl">
                    {progress.user.name}
                  </CardTitle>
                  <CardDescription className="sm:text-sm text-xs">
                    {progress.user.email}
                  </CardDescription>
                </div>
                {progress.user._id.toString() === userId ? (
                  <ProgressActions id={progress._id.toString()} />
                ) : null}
              </div>
            </CardHeader>
            <CardContent>
              {progress.message.split("\n").map((m, i) => (
                <P key={i} className={`[&:not(:first-child)]:mt-1`}>
                  {m}
                </P>
              ))}
            </CardContent>
            <CardFooter>
              <div className="flex gap-1">
                <Likes
                  progressId={progress._id.toString()}
                  isLiked={isLiked}
                  likes={JSON.stringify(progress.likes)}
                />
              </div>
              <p className="text-muted-foreground ml-auto mt-auto text-xs">
                {new Date(progress.createdAt).toLocaleString()}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};

export default Progresses;
