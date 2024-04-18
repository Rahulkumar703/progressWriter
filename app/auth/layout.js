import Wrapper from "@/components/wrapper";

const AuthLayout = ({ children }) => {
  return (
    <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-emerald-100 to-violet-100">
      <Wrapper
        className={
          "flex items-center justify-center min-h-[calc(100vh-5rem)] w-full "
        }
      >
        {children}
      </Wrapper>
    </section>
  );
};

export default AuthLayout;
