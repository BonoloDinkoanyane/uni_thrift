import { z } from "zod";

export const registerSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: "Full name is required" }),
    email: z
        .email("Invalid email address")
        .regex(/\.edu\.za|\.ac\.za$/, {message: "Must use a university email (.edu.za or .ac.za)"}),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    username: z
        .string()
        .min(3, {message: "Username must be at least 3 characters"})
        .max(30, {message: "Username can not be more than 30 characters"})
        .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"}),
    confirmPassword: z.string(),
        }).refine((data) => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
);

export const loginSchema = z.object({
    email: z.email({message: "Invalid email address"}),
    password: z.string().min(1, {message: "Password is required"}),
});