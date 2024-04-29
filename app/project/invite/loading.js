import { Skeleton } from "@/components/ui/skeleton";
import { H1 } from "@/components/ui/typography";
import Wrapper from "@/components/wrapper";

const loading = () => {
  return (
    <Wrapper className={"mt-24"}>
      <div className="p-6 flex flex-col gap-6 shadow-sm border rounded-md">
        <div className={""}>
          <Skeleton className={"w-28 h-8"} />
          <Skeleton className={"w-28 h-6 mt-2"} />
        </div>
        <Skeleton className={"w-full h-10"} />
      </div>
    </Wrapper>
  );
};

export default loading;
