import RecoverPasswordForm from "@/components/recoverPasswordForm";

export const metadata = {
  title: "Recover Password",
  description:
    "Forgot your password recover your account by reseting the password.",
};

const RecoverPasswordPage = ({ searchParams }) => {
  return <RecoverPasswordForm email={searchParams?.email || null} />;
};

export default RecoverPasswordPage;
