import { getUsers } from "@/actions/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import NewPojectForm from "@/components/newPojectForm";
import Wrapper from "@/components/wrapper";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Create a new Poject",
  description: "Keep Track of your Project Daily Progress.",
};

const NewProjectPage = async () => {
  const session = await getServerSession(options);

  const res = await getUsers();
  const users = await res.data.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
  }));
  return (
    <Wrapper className={"mt-20"}>
      <NewPojectForm
        loggedInUser={{ ...session.user, _id: session.user._id.toString() }}
        users={users}
      />
    </Wrapper>
  );
};

export default NewProjectPage;
