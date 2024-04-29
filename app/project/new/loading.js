import { Skeleton } from "@/components/ui/skeleton";
import { H1 } from "@/components/ui/typography";
import Wrapper from "@/components/wrapper";

const loading = () => {
  return (
    <Wrapper className={"mt-20"}>
      <section className="flex flex-col gap-6 mt-5">
        <H1 className={"my-5"}>Create a new Project</H1>
        <div className="flex flex-col gap-6 bg-background rounded-md w-full">
          <div className="flex flex-col gap-2">
            <Skeleton className={"h-6 w-full max-w-52"} />
            <Skeleton className={"h-10 w-full"} />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className={"h-6 w-full max-w-52"} />
            <Skeleton className={"h-20   w-full"} />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className={"h-6 w-full max-w-52"} />
            <Skeleton className={"h-20 w-full"} />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className={"h-6 w-full max-w-52"} />
            <div className="flex items-center space-x-3 space-y-0">
              <Skeleton className={"h-6 w-6 rounded-full"} />
              <div className="space-y-1">
                <Skeleton className={"h-4 w-28"} />
                <Skeleton className={"h-4 w-44"} />
              </div>
            </div>
          </div>
          <Skeleton className={"w-40 h-10 ml-auto"} />
        </div>
      </section>
    </Wrapper>
  );
};

export default loading;
