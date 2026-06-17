import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Minimum characters must be 3"),
  email: z.string().email("Invalid Email is Provided"),
  age: z.number().positive().optional(),
});
