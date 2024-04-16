const AuthLayout = ({ children }) => {
  return (
    <section className="p-1 flex items-center justify-center h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-emerald-100 to-violet-100">
      {children}
    </section>
  );
};

export default AuthLayout;
