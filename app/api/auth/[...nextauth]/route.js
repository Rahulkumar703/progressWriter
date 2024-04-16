import NextAuth from "next-auth";
import { options } from "./options";
import { dbConnect } from "@/db/dbConnect";

dbConnect();

const handler = NextAuth(options);

export { handler as GET, handler as POST };
