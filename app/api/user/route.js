import { getUsers, signup } from "@/actions/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (req) => {
  try {
    const reqBody = await req.json();
    const data = await signup(reqBody);
    return NextResponse.json(data, { status: data.code });
  } catch (error) {
    return NextResponse.json(
      {
        mesasge: error.mesasge,
        type: "error",
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const session = await getServerSession(options);
    if (session) {
      const data = await getUsers();
      return NextResponse.json(data, { status: data.code });
    } else
      return NextResponse.json(
        {
          message: "You are not authorized for this action.",
          type: "error",
        },
        { status: 403 }
      );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      mesasge: error.mesasge,
      type: "error",
    });
  }
};
