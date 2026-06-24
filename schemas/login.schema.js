import { z } from "zod"

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .trim()
        .toLowerCase()
        .email({ message: "Please enter a valid email address." }),
    password: z.string()
})