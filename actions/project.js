"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import Project from "@/models/Project";
import User from "@/models/User";
import { projectSchema } from "@/schema/project";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getProjects = async () => {
  const session = await getServerSession(options);
  if (!session || !session?.user._id) {
    return {
      success: false,
      message: "Please login to see your projects",
      code: 403,
    };
  } else {
    const projects = await Project.find({ "members.user": session.user._id })
      .select("name description members visibility")
      .populate({ path: "members.user", model: User });

    return {
      success: true,
      code: 200,
      message: "Pojects fetched Successfuly.",
      projects,
    };
  }
};
export const getProject = async (_id) => {
  const session = await getServerSession(options);
  if (!session || !session?.user._id) {
    return {
      success: false,
      message: "Please login to see your projects",
      code: 403,
    };
  } else {
    const project = await Project.findOne({ _id })
      .select("name description members visibility")
      .populate({ path: "members.user", model: User });

    if (!project) {
      return {
        success: false,
        code: 404,
        message: "Poject not found or not public.",
        project,
      };
    }
    return {
      success: true,
      code: 200,
      message: "Poject fetched Successfuly.",
      project,
    };
  }
};

export const addProject = async (values) => {
  try {
    const session = await getServerSession(options);
    if (!session || !session?.user) {
      return {
        type: "error",
        message: "Please login to add a new project",
        code: 403,
      };
    } else {
      const result = projectSchema.safeParse({
        ...values,
      });
      if (result.error) {
        const errors = result.error.errors;
        let err = {
          type: "error",
          message: "Validation Error",
          errors: [
            ...errors.map((err) => {
              return { [err.path[0]]: err.message };
            }),
          ],
          code: 400,
        };
        return err;
      } else if (result.success) {
        const { name, description, members, visibility } = result.data;

        // Extract user IDs from the members array
        const memberUserIds = members.map((member) => member.user);

        // Create an array of updated member objects with user IDs and admin status
        const updatedMembers = members.map((member) => ({
          user: member._id,
          admin: member.admin,
        }));
        // Create the new project
        const newProject = await Project.create({
          name,
          description,
          members: updatedMembers,
          visibility,
        });

        // Update all users in the memberUserIds array to add the new project ID to their projects array
        await User.updateMany(
          { _id: { $in: memberUserIds } },
          { $addToSet: { projects: newProject._id } }
        );

        revalidatePath("/");
        return {
          type: "success",
          code: 200,
          message: "Pojects created Successfuly.",
          project: { _id: newProject._id.toString(), name: newProject.name },
        };
      }
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};
