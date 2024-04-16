import { cn } from "@/lib/utils";

const Wrapper = ({ children, className }) => {
  return (
    <div className={cn("max-w-7xl mx-auto  sm:p-4 xs:p-2", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
