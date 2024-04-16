import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import Token from "@/models/Token";

export const PASSWORD_RESET = "password-reset";

export const DICTIONARY = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  "a",
  "e",
  "i",
  "o",
  "u",
  "A",
  "E",
  "I",
  "O",
  "U",
  "@",
  "$",
  "(",
  ")",
];

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateCode = () => {
  let code = "";
  for (let i = 0; i < 6; ++i) {
    code += DICTIONARY[Math.floor(Math.random() * DICTIONARY.length - 1)];
  }

  return code;
};

export const sendPasswordResetMail = async ({ link, email }) => {
  console.log(link);
};

export const verifyPasswordResetToken = async (token) => {
  try {
    const payload = jwt.decode(token, process.env.JWT_SECRET);
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
