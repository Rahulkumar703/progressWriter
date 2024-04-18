"use server";

import { dbConnect } from "@/db/dbConnect";
import { PASSWORD_RESET, sendPasswordResetMail } from "@/lib/utils";
import Token from "@/models/Token";
import User from "@/models/User";
import {
  recoverPasswordSchema,
  setNewPasswordSchema,
  signupSchema,
} from "@/schema/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

dbConnect();

export const signup = async (values) => {
  try {
    const result = signupSchema.safeParse({
      ...values,
      confirmPassword: values?.password,
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
      const { name, email, password } = result.data;

      const userExist = await User.findOne({ email });

      if (userExist)
        return {
          message: "You are already Registered",
          type: "info",
          code: 409,
        };
      await User.create({ name, email, password });

      revalidatePath("/project/new");

      return { message: "SignedUp Successfully", type: "success", code: 200 };
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        message: "You are not a registered member.",
        type: "info",
        code: 404,
      };
    }
    if (!user?.password) {
      return {
        message:
          "You have previously signed up with Social Account (eg- Google or GitHub). Please log in using them.",
        type: "info",
        code: 400,
      };
    }
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return {
        message: "incorrect Credentials",
        type: "error",
        code: 401,
      };
    }
    return {
      message: "Loggedin successfuly",
      type: "success",
      code: 200,
      user,
    };
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find().select("name email image");
    return {
      message: "Users Fetched Successfully",
      type: "success",
      code: 200,
      data: users,
    };
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const sendPasswordResetLink = async (values) => {
  try {
    const result = recoverPasswordSchema.safeParse({
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
    }
    if (result.success) {
      const { email } = result.data;
      const user = await User.findOne({ email });
      if (!user) {
        return {
          message: "You are not a registered member.",
          type: "error",
          code: 404,
        };
      }

      const payload = {
        name: user.name,
        user: user._id,
        geneartedFor: PASSWORD_RESET,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      await Token.create({ token, user: user._id });
      const link = `${process.env.NEXTAUTH_URL}/auth/set-password?token=${token}`;

      await sendPasswordResetMail({ link, email });

      return {
        message: "Password reset link has been sent.",
        type: "success",
        code: 200,
      };
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};

export const updatePassword = async (values) => {
  try {
    const result = setNewPasswordSchema.safeParse({
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
      const { user, password, token } = result.data;

      const validToken = await Token.findOne({ $and: [{ user }, { token }] });

      if (!validToken)
        return {
          message: "Password reset link Expired or Invalid.",
          type: "error",
          code: 403,
        };

      if (Date.now() - new Date(validToken.createdAt) > 5 * 60 * 1000) {
        await Token.deleteOne({ _id: validToken._id });
        return {
          message: "Password reset link Expired.",
          type: "error",
          code: 403,
        };
      }

      const userExist = await User.findOne({ _id: user });

      if (!userExist)
        return {
          message: "Unauthorized Access",
          type: "error",
          code: 401,
        };
      // hashing and saving new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.updateOne(
        { _id: user },
        { $set: { password: hashedPassword } }
      );

      // deleting the token
      await Token.deleteOne({ $and: [{ token }, { user }] });

      return {
        message: "Password Updated Successfuly",
        type: "success",
        code: 200,
      };
    }
  } catch (error) {
    return { message: error.message, type: "error", code: 500 };
  }
};
