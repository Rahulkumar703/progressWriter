"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import Project from "@/models/Project";
import User from "@/models/User";
import { projectSchema, updateProjectSchema } from "@/schema/project";
import jwt from "jsonwebtoken";
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
      .select("name description members visibility createdAt inviteLink")
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
    const project = await Project.findOne({
      $and: [{ _id }, { "members.user": session?.user._id }],
    })
      .select("name description members visibility createdAt inviteLink")
      .populate({ path: "members.user", model: User });

    if (!project) {
      return {
        success: false,
        code: 404,
        message: "Poject not found or not public.",
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

export const deleteProject = async (_id) => {
  const session = await getServerSession(options);
  if (!session || !session?.user._id) {
    return {
      success: false,
      message: "Please login to see your projects",
      code: 403,
    };
  } else {
    const project = await Project.findOne({
      $and: [
        { "members.admin": true },
        { "members.user": session.user._id },
        { _id },
      ],
    });

    if (!project) {
      return {
        success: false,
        code: 404,
        message: "You are not allowed to perform this action",
      };
    }
    await Project.deleteOne({ _id });
    revalidatePath(`/`);
    return {
      type: "success",
      code: 200,
      message: "Poject deleted Successfuly.",
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

        const inviteToken = jwt.sign(
          {
            projectID: newProject._id,
          },
          process.env.JWT_SECRET
        );
        const inviteLink = `${process.env.NEXTAUTH_URL}/project/invite?token=${inviteToken}`;

        newProject.inviteLink = inviteLink;

        await newProject.save();

        // Update all users in the memberUserIds array to add the new project ID to their projects array
        await User.updateMany(
          { _id: { $in: memberUserIds } },
          { $addToSet: { projects: newProject._id } }
        );

        revalidatePath("/");
        return {
          type: "success",
          code: 200,
          message: "Poject created Successfuly.",
          project: { _id: newProject._id.toString(), name: newProject.name },
        };
      }
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const updateProject = async (values) => {
  try {
    const session = await getServerSession(options);
    if (!session || !session?.user) {
      return {
        type: "error",
        message: "Please login to add a new project",
        code: 403,
      };
    } else {
      const result = updateProjectSchema.safeParse({
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
        const { name, description, id, visibility } = result.data;

        // Update the project
        await Project.updateOne(
          { _id: id },
          {
            $set: {
              name,
              description,
              visibility,
            },
          }
        );
        revalidatePath("/");
        revalidatePath(`/project/${name.replaceAll(" ", "+")}?id=${id}`);

        return {
          type: "success",
          code: 200,
          message: "Poject updated Successfuly.",
        };
      }
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const makeAdmin = async (memberId, projectId) => {
  try {
    const session = await getServerSession(options);
    if (!session || !session?.user) {
      return {
        type: "error",
        message: "Please login to add a new project",
        code: 403,
      };
    } else {
      const project = await Project.findOne({
        $and: [
          { "members.admin": true },
          { "members.user": session.user._id },
          { _id: projectId },
        ],
      });

      if (!project) {
        return {
          type: "error",
          message: "You are not an Admin.",
          code: 403,
        };
      }
      await Project.updateOne(
        { $and: [{ "members.user": memberId }, { _id: projectId }] },
        { $set: { "members.$.admin": true } }
      );

      revalidatePath(`/`);
      revalidatePath(
        `/project/${project.name.replaceAll(" ", "+")}?id=${projectId}`
      );
      return {
        type: "success",
        code: 200,
        message: "Admin Updated successfully",
      };
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const removeAdmin = async (memberId, projectId) => {
  try {
    const session = await getServerSession(options);
    if (!session || !session?.user) {
      return {
        type: "error",
        message: "Please login to add a new project",
        code: 403,
      };
    } else {
      const project = await Project.findOne({
        $and: [
          { "members.admin": true },
          { "members.user": session.user._id },
          { _id: projectId },
        ],
      });

      if (!project) {
        return {
          type: "error",
          message: "You are not an Admin.",
          code: 403,
        };
      }
      await Project.updateOne(
        { $and: [{ "members.user": memberId }, { _id: projectId }] },
        { $set: { "members.$.admin": false } }
      );

      revalidatePath(`/`);
      revalidatePath(
        `/project/${project.name.replaceAll(" ", "+")}?id=${projectId}`
      );
      return {
        type: "success",
        code: 200,
        message: "Admin Updated successfully",
      };
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const removeFromProject = async (memberId, projectId) => {
  try {
    const session = await getServerSession(options);
    if (!session || !session?.user) {
      return {
        type: "error",
        message: "Please login to add a new project",
        code: 403,
      };
    } else {
      const project = await Project.findOne({
        $and: [{ "members.admin": true }, { "members.user": session.user._id }],
      });

      if (!project) {
        return {
          type: "error",
          message: "You are not an Admin.",
          code: 403,
        };
      }
      await Project.updateOne(
        { _id: projectId },
        { $pull: { members: { user: memberId } } }
      );

      revalidatePath(`/`);
      revalidatePath(
        `/project/${project.name.replaceAll(" ", "+")}?id=${projectId}`
      );

      return {
        type: "success",
        code: 200,
        message: "Member removed successfully",
      };
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const addMember = async (projectId) => {
  try {
    const session = await getServerSession(options);
    if (!session || !session?.user) {
      return {
        type: "error",
        message: "Please login to add a new project",
        code: 403,
      };
    } else {
      const project = await Project.findOne({ _id: projectId });

      if (!project) {
        return {
          type: "error",
          message: "Project not found.",
          code: 404,
        };
      }
      const isAlreadyMember = project.members.some(
        (member) => String(member.user) === String(session?.user._id)
      );
      if (isAlreadyMember) {
        return {
          type: "info",
          code: 200,
          message: "You are already in this project",
          project: { _id: project._id, name: project.name },
        };
      }
      project.members.push({ user: session?.user._id, admin: false });
      await project.save();

      revalidatePath(`/`);
      revalidatePath(
        `/project/${project.name.replaceAll(" ", "+")}?id=${projectId}`
      );
      return {
        type: "success",
        code: 200,
        message: "Project Joined",
        project: { _id: project._id, name: project.name },
      };
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};
