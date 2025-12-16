"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { registerSchema, signInSchema, signUpSchema } from "./utils/zodSchema";
import z from "zod";
import { comparePasswords, generateSalt, hashPassword } from "./utils/Auth/passwordHasher";
import { create } from "domain";
import { createSession, deleteUserSession, userSession } from "./utils/sessionManagement/session";
import { cookies } from "next/headers";
import { getCookiesAdapter } from "./utils/sessionManagement/cookiesAdapter";


export async function registerUser(prevState: any, formData: FormData) {
    console.log("[registerUser] Starting registration");

    try {
        // session is guaranteed to exist here because requireUser redirects if not
        const submission = parseWithZod(formData, {
            schema: registerSchema,
        });

        console.log("[registerUser] Submission status:", submission.status);

        if (submission.status !== "success") {
            console.log("[registerUser] Validation failed, returning errors");
            return submission.reply();
        }

        // validate university and campus IDs are valid numbers
        const universityId = Number(submission.value.university);
        const campusId = Number(submission.value.campus);

        console.log("[registerUser] University ID:", universityId, "Campus ID:", campusId);

        if (isNaN(universityId) || isNaN(campusId)) {
            console.log("[registerUser] Invalid university/campus selection");
            return submission.reply({
                formErrors: ["Invalid university or campus selection"]
            });
        }

        console.log("[registerUser] Updating user:", submission.value.username);

        // update user profile with onboarding information
        const data = await db.user.update({
            where: {
                username: submission.value.username as string,
            },
            data: {
                name: submission.value.fullName as string,
                username: submission.value.username as string,
                email: submission.value.email as string,
                university: {
                    connect: { id: universityId }
                },
                campus: {
                    connect: { id: campusId }
                },
                // the 2 'connect' lines tell Prisma:
                // "Find the university with this ID, and connect the user to it."
                onboardingComplete: true, // Mark onboarding as complete
            }
        });

        console.log("[registerUser] User updated successfully, redirecting to /browse");

        // redirect to the browse page after successful onboarding
        return redirect("/browse");

    } catch (error) {
        console.error("[registerUser] Error:", error);

        // Return a plain error object - component will need to handle this
        return { error: "Unable to complete registration. Please try again." };
    }
}

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {

    try {
        // validates the input data against the signup schema (username, email, password)
        const { success, data } = signInSchema.safeParse(unsafeData)

        if (!success) {
            return { error: "Unable to log you in" };
        }

        // destructures, and extracts the validated fields 
        const { identifier, password } = data;

        const user = await db.user.findFirst({
            where: {
                OR: [
                    { username: identifier },
                    { email: identifier },
                ],
            },

            select: {
                passwordHash: true,
                salt: true,
                userId: true,
                username: true,
                email: true,
                isVerified: true,
                isBanned: true,
                createdAt: true,
                updatedAt: true
            },
        });

        // generic error message to prevent username enumeration attacks
        if (!user) {
            return { error: "Invalid credentials" };
        }

        // check if user account is banned
        if (user.isBanned) {
            return { error: "Your account has been banned. Please contact support." };
        }

        const isCorrectPassword = await comparePasswords({
            password,
            salt: user.salt,
            hashedPassword: user.passwordHash,
        });

        if (!isCorrectPassword) {
            return { error: "Incorrect password" };
        }

        // maps database user object to session format
        // extracts only the fields needed for the session (excludes passwordHash and salt)
        const userSessionData: userSession = {
            userId: user.userId,  // Map id to userId
            username: user.username ?? "",
            email: user.email,
            isVerified: user.isVerified ?? false,
            isBanned: user.isBanned ?? false,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        console.log("[signIn] Creating session for user:", user.userId);

        // obtains the cookies adapter - this bridges Next.js's cookie API to our custom Cookies interface
        // the adapter translates between incompatible type signatures (method overloads, return types, option formats)
        // specifically, it converts Next.js's complex cookie methods into our simplified interface
        // this allows createSession() to remain framework-agnostic and work with any cookie implementation
        const cookiesAdapter = await getCookiesAdapter();

        console.log("[signIn] Cookies adapter obtained");

        // creates a session for the newly created user by:
        // 1. generating a secure random session ID
        // 2. storing the session data in Redis with expiration
        // 3. setting a session cookie in the user's browser (via the adapter)
        await createSession(userSessionData, cookiesAdapter);

        console.log("[signIn] Session created successfully");

    } catch (error) {

        console.error("Sign in error:", error);

        // handle specific errors
        if (error instanceof Error) {
            console.log("[signIn] Error type:", error.message);
            if (error.message.includes("Redis")) {
                return { error: "Session service unavailable. Please try again." };
            }
            if (error.message.includes("Cookie")) {
                return { error: "Unable to create session. Please enable cookies." };
            }
        }

        return { error: "Unable to sign in. Please try again." };
    }

    console.log("[signIn] About to redirect to /profile");
    //only redirects if sign in is successful
    redirect("/profile");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
    try {
        // validates the input data against the signup schema (username, email, password)
        const { success, data } = signUpSchema.safeParse(unsafeData)

        if (!success) {
            return { error: "Unable to create account" };
        }

        // destructures, and extracts the validated fields 
        const { username, email, password } = data;

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

        //verifies that the user creation has succeeded by checking newUser is not null
        if (newUser == null) {
            return { error: "Unable to create account" };
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

        // obtains the cookies adapter - this bridges Next.js's cookie API to our custom Cookies interface
        // the adapter translates between incompatible type signatures (method overloads, return types, option formats)
        // specifically, it converts Next.js's complex cookie methods into our simplified interface
        // this allows createSession() to remain framework-agnostic and work with any cookie implementation
        const cookiesAdapter = await getCookiesAdapter();

        // creates a session for the newly created user by:
        // 1. generating a secure random session ID
        // 2. storing the session data in Redis with expiration
        // 3. setting a session cookie in the user's browser (via the adapter)
        await createSession(userSessionData, cookiesAdapter);
    } catch (error) {

        console.error("Sign up error:", error);

        // handle specific database errors
        if (error instanceof Error) {
            // unique constraint violation 
            if (error.message.includes("Unique constraint")) {
                return { error: "Username or email already exists" };
            }
            // Redis connection error
            if (error.message.includes("Redis")) {
                return { error: "Session service unavailable. Please try again." };
            }
            // Cookie error
            if (error.message.includes("Cookie")) {
                return { error: "Unable to create session. Please enable cookies." };
            }
        }
        //catches any errors during user creation or session creation
        return { error: "Unable to create account. Please try again." };
    }

    // redirect only happens if no errors occurred
    redirect("/")
}

export async function logOut() {
    try {
        // obtains the cookies adapter to manage cookie deletion in a framework-agnostic way
        const cookiesAdapter = await getCookiesAdapter();

        // destroys the user's session by:
        // 1. retrieving the session ID from the cookie
        // 2. deleting the session data from Redis
        // 3. removing the session cookie from the browser
        await deleteUserSession(cookiesAdapter);
    } catch (error) {
        console.error("Logout error:", error);
        // redirects even if the session deletion fails
        // ensures the user can't get stuck
    }

    // always redirect to home page after logout attempt
    redirect("/onboarding");
}
