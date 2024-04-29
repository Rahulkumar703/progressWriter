import { z } from "zod";

export const progressSchema = z.object({
  projectId: z.string().min(1, {
    message: "Poject id required.",
  }),
  message: z.string().min(10, {
    message: "Prrogress Message must be atleast 10 words long.",
  }),
});
