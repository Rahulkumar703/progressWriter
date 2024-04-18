import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ user, className }) => {
  const nameArray = user?.name?.split(" ") || ["User"];
  return (
    <Avatar className={cn("h-12 w-12", className)}>
      <AvatarImage src={user?.image} alt={user?.name} />
      <AvatarFallback className="capitalize">
        {nameArray.length > 1
          ? `${nameArray[0][0]}${nameArray[1][0]}`
          : `${nameArray[0][0]}${nameArray[0][1]}`}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
