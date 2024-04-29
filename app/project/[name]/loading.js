import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "@/components/wrapper";

const loading = () => {
  return (
    <Wrapper className={"mt-20"}>
      <div className="flex flex-col gap-6 mt-5 bg-background ">
        <div className="flex justify-between items-center ">
          <div className="">
            <div className="flex gap-2 items-center">
              <Skeleton className={"sm:w-72 w-40 h-12"} />
              <Skeleton className={"w-8 h-8 rounded-full"} />
            </div>
            <Skeleton className={"sm:w-60 w-32 h-6 mt-2"} />
          </div>
          <Skeleton className={"sm:w-56 w-10 h-10"} />
        </div>
        <div className="mt-5 ">
          <section className=" space-y-6">
            <Skeleton className={"w-full h-64"} />
            <Skeleton className={"w-full h-64"} />
            <Skeleton className={"w-full h-64"} />
            <Skeleton className={"w-full h-64"} />
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default loading;
