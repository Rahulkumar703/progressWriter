import jwt from "jsonwebtoken";
import Token from "@/models/Token";
import Project from "@/models/Project";
import { PASSWORD_RESET } from "@/lib/helper";

export const sendPasswordResetMail = async ({ link, email }) => {
  console.log(link);
};

export const verifyPasswordResetToken = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { user, geneartedFor } = payload;
    const validToken = await Token.findOne({
      $and: [{ token }, { user }],
    });
    if (!validToken)
      return {
        message: "Invalid Password Reset Link.",
        isVarified: false,
      };
    if (Date.now() - new Date(validToken.createdAt) > 5 * 60 * 1000) {
      await Token.deleteOne({ _id: validToken._id });
      return { isVarified: false, message: "Password Reset Link Expired." };
    }
    if (geneartedFor !== PASSWORD_RESET || !validToken) {
      return { isVarified: false, message: "Invalid Password reset Link." };
    }
    return { isVarified: true, message: "Password Reset Link Verified" };
  } catch (error) {
    return { isVarified: false, message: error.message };
  }
};

export const verifyProjectInviteLink = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { projectID, iat } = payload;
    const project = await Project.findOne({
      $and: [
        {
          inviteLink: `${process.env.NEXTAUTH_URL}/project/invite?token=${token}`,
        },
        { _id: projectID },
      ],
    });
    if (!project)
      return {
        message: "Invalid Invitation Link.",
        isVarified: false,
      };
    // if (Date.now() - new Date(iat) > 5 * 60 * 1000) {
    //   await Token.deleteOne({ _id: validToken._id });
    //   return { isVarified: false, message: "Password Reset Link Expired." };
    // }
    return {
      isVarified: true,
      project: {
        _id: project._id,
        name: project.name,
        description: project.description,
      },
    };
  } catch (error) {
    return { isVarified: false, message: "Invalid Invitation Link." };
  }
};
