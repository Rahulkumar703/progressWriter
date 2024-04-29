"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import Comment from "@/models/Comment";
import Progress from "@/models/Progress";
import Project from "@/models/Project";
import User from "@/models/User";
import { progressSchema } from "@/schema/progress";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getProgresses = async (projectId) => {
  const session = await getServerSession(options);
  if (!session || !session?.user._id) {
    return {
      success: false,
      message: "Please login to see your projects",
      code: 403,
    };
  } else {
    const progresses = await Progress.find({ project: projectId })
      .populate([
        {
          path: "likes",
          model: User,
          select: "name image email",
          options: { sort: { createdAt: -1 } },
        },
        {
          path: "comments",
          model: Comment,
          options: { sort: { createdAt: -1 } },
        },
        { path: "user", model: User, select: "name image email" },
      ])
      .sort({ createdAt: -1 });

    return {
      success: true,
      code: 200,
      message: "Progresss fetched Successfuly.",
      progresses,
    };
  }
};

export const getProgress = async (_id) => {
  const session = await getServerSession(options);
  if (!session || !session?.user._id) {
    return {
      success: false,
      message: "Please login to see your projects",
      code: 403,
    };
  } else {
    const progress = await Progress.findOne({
      $and: [{ _id }, { user: session?.user._id }],
    }).populate([
      { path: "likes", model: User, select: "name image email" },
      { path: "comments", model: Comment },
      { path: "user", model: User, select: "name image email" },
    ]);

    if (!progress) {
      return {
        success: false,
        code: 404,
        message: "Progress not found or not public.",
      };
    }
    return {
      success: true,
      code: 200,
      message: "Progress fetched Successfuly.",
      progress,
    };
  }
};

export const addProgress = async (values) => {
  try {
    const session = await getServerSession(options);
    if (!session || !session?.user) {
      return {
        type: "error",
        message: "Please login to add a new project",
        code: 403,
      };
    } else {
      const result = progressSchema.safeParse({
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
        const { projectId, message } = result.data;

        console.log(message);

        const project = await Project.findOne({
          $and: [{ _id: projectId }, { "members.user": session?.user._id }],
        });

        if (!project)
          return {
            type: "error",
            code: 403,
            message: "You are no longer a part of this project.",
          };

        await Progress.create({
          project: projectId,
          user: session?.user._id,
          message,
        });

        revalidatePath(
          `/project/${project.name.replaceAll(" ", "+")}?id=${projectId}`
        );

        return {
          type: "success",
          code: 200,
          message: "Progress added Successfuly.",
        };
      }
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const deleteProgress = async (_id) => {
  const session = await getServerSession(options);
  if (!session || !session?.user._id) {
    return {
      success: false,
      message: "Please login to see your projects",
      code: 403,
    };
  } else {
    const progress = await Progress.findOne({
      $and: [{ user: session.user._id }, { _id }],
    });

    if (!progress) {
      return {
        success: false,
        code: 404,
        message: "You are not allowed to perform this action",
      };
    }
    const project = await Project.findOne({
      _id: progress.project,
    });

    await Progress.deleteOne({ _id });

    revalidatePath(
      `/project/${project.name.replaceAll(" ", "+")}?id=${project._id}`
    );

    return {
      type: "success",
      code: 200,
      message: "Progress deleted Successfuly.",
    };
  }
};

export const likeProgress = async (_id) => {
  const session = await getServerSession(options);
  if (!session || !session?.user._id) {
    return {
      success: false,
      message: "Please login to see your projects",
      code: 403,
    };
  } else {
    const progress = await Progress.findOne({
      _id,
    });

    if (!progress) {
      return {
        success: false,
        code: 404,
        message: "Progress Not found",
      };
    }
    const project = await Project.findOne({
      _id: progress.project,
    });

    const isLiked = progress.likes.includes(session.user._id);

    if (isLiked) {
      await Progress.updateOne({ _id }, { $pull: { likes: session.user._id } });
    } else {
      await Progress.updateOne(
        { _id },
        { $addToSet: { likes: session.user._id } }
      );
    }

    revalidatePath(
      `/project/${project.name.replaceAll(" ", "+")}?id=${project._id}`
    );

    return {
      type: "success",
      code: 200,
      message: "Progress Liked Successfuly.",
    };
  }
};
