import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter Poject name.",
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
