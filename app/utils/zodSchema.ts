import { z } from "zod";


export const emailSchema = z
    .string()
    .email({ message: "Invalid email address." })
    .regex(/\.edu\.za|\.ac\.za$/, { message: " Must use a university email (.edu.za or .ac.za)" });

export const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[.!@#$%^&*()_+\-=/]/, { message: "Password must contain at least one special character (.!@#$%^&*()_+-=)" });

export const usernameSchema = z
    .string()
    .min(3, { message: "Username must be at least 3 characters. " })
    .max(30, { message: "Username can not be more than 30 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" });

export const registerSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: "Full name is required" }),
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    university: z
        .string()
        .min(2, { message: "University is required" }),
    campus: z
        .string()
        .min(2, { message: "Campus is required" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Please confirm your password" }),
    }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const signUpSchema = z.object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
});

export const signInSchema = z
  .object({
    identifier: z.string().min(1, "Email or username is required"),
    password: z.string().min(1, "Password is required"),
  })
  .refine(
    (data) =>
      emailSchema.safeParse(data.identifier).success ||
      usernameSchema.safeParse(data.identifier).success,
    {
      message: "Must be a valid email or username",
      path: ["identifier"],
    }
  );