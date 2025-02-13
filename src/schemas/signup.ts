import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(4, { message: `Username must be greater than 4 characters` })
    .max(15, {
      message: `Username must be at least 15 characters`,
    }),
  email: z.string().email({ message: `Please enter valid email` }),
  password: z.string().min(8, {
    message: `Password must be greater than 8 characters`,
  }),
});
