import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Characters must be of 3 lenghth"),
  content: z.string().min(10, "Content must be more than 10 characters length"),
  userId: z.string().min(1, "userId is required"),
});
