import { Skeleton } from "@/components/ui/skeleton";
import { H1 } from "@/components/ui/typography";
import Wrapper from "@/components/wrapper";

const loading = () => {
  return (
    <Wrapper className={"min-h-[calc(100vh-12rem)] mt-20"}>
      <section className="flex flex-col gap-6 mt-5">
        <H1 className={"my-5"}>My Projects</H1>
        <div className="grid xs:grid-cols-[repeat(auto-fit,minmax(300px,1rem))] justify-center sm:justify-normal gap-4 pb-2">
          <Skeleton className={"h-56"} />
          <Skeleton className={"h-56"} />
          <Skeleton className={"h-56"} />
          <Skeleton className={"h-56"} />
          <Skeleton className={"h-56"} />
        </div>
      </section>
    </Wrapper>
  );
};

export default loading;
