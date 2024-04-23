import { cn } from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ user, className }) => {
  const nameArray = user?.name?.split(" ") || ["User"];
  const img = user?.image;

  return (
    <Avatar className={cn("h-12 w-12", className)}>
      <AvatarImage src={img} alt={user?.name} />
      <AvatarFallback className="capitalize">
        {`${nameArray[0][0]}`}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
