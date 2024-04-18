import SetPasswordForm from "@/components/setPasswordForm";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyPasswordResetToken } from "@/lib/utils";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

export const metadata = {
  title: "Set a New Password",
  description: "Set your new password.",
};

const RecoverPasswordPage = async ({ searchParams }) => {
  const token = searchParams.token;

  const res = await verifyPasswordResetToken(token);
  if (res && !res?.isVarified)
    return (
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle>{res?.message}</CardTitle>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/" className="inline-block">
            <Button className="w-full">
              <MdKeyboardArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );

  const payload = jwt.decode(token, process.env.JWT_SECRET);
  return (
    <SetPasswordForm name={payload?.name} user={payload.user} token={token} />
  );
};

export default RecoverPasswordPage;
