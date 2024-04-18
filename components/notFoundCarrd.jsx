import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

const NotFoundCard = ({ title, message }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase text-destructive">{title}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <FaSearch className="w-16 h-16" />
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <Link href={"/"}>
          <Button>
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NotFoundCard;
