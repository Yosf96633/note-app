import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ message: `Enter valid string` })
    .email({ message: `Please enter valid email` }),
  password: z
    .string()
    .min(8, { message: `Password must be greater than 8 characters` }),
});
