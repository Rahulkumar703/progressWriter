import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Please enter Poject name.",
    })
    .refine((name) => name.toLowerCase() !== "new", {
      message: `Project name cannot be "new". this name is reserved in all case combinations.`,
    }),
  description: z.string().optional(),
  members: z
    .array(
      z.object({
        _id: z.string().min(1, { message: "member ID is required" }),
        admin: z.boolean({ message: "admin status not provided" }).optional(),
      })
    )
    .min(1, { message: "Add atleast one member to your project" })
    .length(),
  visibility: z.enum(["private", "public"]).default("private"),
});

export const updateProjectSchema = z.object({
  id: z.string().min(1, {
    message: "Project id not specified.",
  }),
  name: z
    .string()
    .min(1, {
      message: "Please enter Poject name.",
    })
    .refine((name) => name.toLowerCase() !== "new", {
      message: `Project name cannot be "new". this name is reserved in all case combinations.`,
    }),
  description: z.string().optional(),
  visibility: z.enum(["private", "public"]),
});
