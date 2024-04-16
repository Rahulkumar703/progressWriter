"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const getProjects = async () => {
  const session = await getServerSession(options);
  if (!session || !session?.user) {
    return {
      success: false,
      message: "Please login to see your projects",
      code: 403,
    };
  } else {
    const projects = [
      {
        _id: 123,
        name: "IIT Bombay",
        description: "Keep track of daily progress of app",
        members: [
          {
            _id: 1,
            name: "Rahul",
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocJeOHGpGrecp9Q7weH8ulW2i-BRdgXiMxDoTdFJJibF-_umD_a0iA=s96-c",
          },
        ],
      },
      {
        _id: 123,
        name: "IIT Bombay",
        description: "Keep track of daily progress of app",
        members: [
          {
            _id: 1,
            name: "Rahul",
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocJeOHGpGrecp9Q7weH8ulW2i-BRdgXiMxDoTdFJJibF-_umD_a0iA=s96-c",
          },
        ],
      },
      {
        _id: 123,
        name: "IIT Bombay",
        description: "Keep track of daily progress of app",
        members: [
          {
            _id: 1,
            name: "Rahul",
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocJeOHGpGrecp9Q7weH8ulW2i-BRdgXiMxDoTdFJJibF-_umD_a0iA=s96-c",
          },
          {
            _id: 2,
            name: "Yash",
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocJeOHGpGrecp9Q7weH8ulW2i-BRdgXiMxDoTdFJJibF-_umD_a0iA=s96-c",
          },
          {
            _id: 4,
            name: "Aman",
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocJeOHGpGrecp9Q7weH8ulW2i-BRdgXiMxDoTdFJJibF-_umD_a0iA=s96-c",
          },
        ],
      },
      {
        _id: 123,
        name: "IIT Bombay",
        description: "Keep track of daily progress of app",
        members: [
          {
            _id: 1,
            name: "Rahul",
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocJeOHGpGrecp9Q7weH8ulW2i-BRdgXiMxDoTdFJJibF-_umD_a0iA=s96-c",
          },
        ],
      },
      {
        _id: 123,
        name: "IIT Bombay",
        description: "Keep track of daily progress of app",
        members: [
          {
            _id: 1,
            name: "Rahul",
            image:
              "https://lh3.googleusercontent.com/a/ACg8ocJeOHGpGrecp9Q7weH8ulW2i-BRdgXiMxDoTdFJJibF-_umD_a0iA=s96-c",
          },
        ],
      },
    ];
    return {
      success: true,
      code: 200,
      message: "Pojects fetched Successfuly.",
      projects: [],
    };
  }
};
