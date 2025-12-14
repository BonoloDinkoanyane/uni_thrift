"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { registerSchema, signUpSchema } from "./utils/zodSchema";
import z from "zod";
import { generateSalt, hashPassword } from "./utils/passwordHasher";
import { create } from "domain";
import { createSession, userSession } from "./utils/session";
import { cookies } from "next/headers";


export async function registerUser(prevState: any, formData: FormData) {

    // session is guaranteed to exist here because requireUser redirects if not


    const submission = parseWithZod(formData, {
        schema: registerSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await db.user.update({
        where: {
            username: submission.value.username as string,
        },
        data: {
            name: submission.value.fullName as string,
            username: submission.value.username as string,
            email: submission.value.email as string,
            university: {
                connect: { id: Number(submission.value.university) }
            },
            campus: {
                connect: { id: Number(submission.value.campus) }
            },
            // the 2 'connect' lines tell Prisma:
            // “Find the university with this ID, and connect the user to it.”

            onboardingComplete: true, // Mark onboarding as complete
        }
    });

    //redirect to the browse page after successful onboarding
    return redirect("/browse");
}

export async function signIn(){

}

export async function signUp(user: unknown) {
    // validates the input data against the signup schema (username, email, password)
    const parsed = signUpSchema.safeParse(user);

    if (!parsed.success) {
        return { error: "Invalid input" };
    }

    // extracts the validated fields - always use parsed.data for type safety
    const { username, email, password } = parsed.data;

    // checks if a user with the same username or email already exists
    const existingUser = await db.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });

    // prevents duplicate accounts
    if (existingUser != null) {
        return "Account already exists";
    }

    try {
        // generates a random salt for password hashing
        const salt = generateSalt();

        // hashes the password with the salt before storing
        const passwordHash = await hashPassword(password, salt);

        //creates the new user record in the db
        const newUser = await db.user.create({
            data: {
                username,
                email,
                passwordHash,
                salt,
            },
        });

        //verifies that the user creation has succeeded
        if (newUser == null){ 
            return "Unable to create account";
        }

        // maps database user object to session format
        // better than using the created db object directly because this extracts only the needed fields for the session
        // Uses nullish coalescing (??) to provide defaults for nullable fields
        const userSessionData: userSession = {
            userId: newUser.userId,
            username: newUser.username ?? "",
            email: newUser.email,
            isVerified: newUser.isVerified ?? false,
            isBanned: newUser.isBanned ?? false,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };

        //creates a session for the newly created user
        await createSession(userSessionData, await cookies());
    } catch (error) {
        //catches any errors during user creation or session creation
        return "Unable to create account";
    }
    
    redirect("/")
    
}