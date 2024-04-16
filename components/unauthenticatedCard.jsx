import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaLock } from "react-icons/fa";
import LoginButton from "./loginButton";

const UnauthenticatedCard = ({ message }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase text-destructive">
          Unauthenticated
        </CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <FaLock className="w-16 h-16" />
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <LoginButton size="lg" />
      </CardFooter>
    </Card>
  );
};

export default UnauthenticatedCard;
