import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email({ message: "Invalid Email" }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const signupSchema = z
  .object({
    name: z.string().min(1, {
      message: "Please enter your full name.",
    }),
    email: z
      .string()
      .min(1, {
        message: "Please enter your email.",
      })
      .email({ message: "Please enter a valid Email" }),
    password: z.string().min(1, {
      message: "Please set a Password.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Please re-enter your Password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const recoverPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please enter your email.",
    })
    .email({ message: "Please enter a valid Email" }),
});

export const setNewPasswordSchema = z
  .object({
    user: z.string().min(1, {
      message: "Please enter your email.",
    }),
    token: z.string().min(1, {
      message: "Please enter the reset token.",
    }),
    password: z.string().min(1, {
      message: "Please set a Password.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Please re-enter your Password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
