import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { error: "Please enter your email" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      error: "Please enter a valid email address",
    }),
  password: z
    .string()
    .min(1, { error: "Please enter your password" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password should be at most 32 characters long" }),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { error: "Please enter your username" })
      .max(32, { error: "Username should be at most 32 characters" }),

    email: z
      .string()
      .min(1, { error: "Please enter your email" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
        error: "Please enter a valid email address",
      }),

    password: z
      .string()
      .min(1, { error: "Please enter your password" })
      .min(8, { error: "Password must be at least 8 characters long" })
      .max(32, { error: "Password should be at most 32 characters long" }),

    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
