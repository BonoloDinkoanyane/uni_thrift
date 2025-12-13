"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { registerSchema, signUpSchema } from "./utils/zodSchema";
import z from "zod";
import { generateSalt, hashPassword } from "./utils/passwordHasher";


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

            //onboardingComplete: true,
        }
    });

    //redirect to the browse page after successful onboarding
    return redirect("/browse");
}

export async function signIn(){

}

export async function signUp(data: unknown) {

    const parsed = signUpSchema.safeParse(data);

    if (!parsed.success) {
        return { error: "Invalid input" };
    }

    // always use `parsed.data`, not `data` directly
    const { username, email, password } = parsed.data;

    const existingUser = await db.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });

    if (existingUser != null) {
        return "Account already exists";
    }

    try {
        const salt = generateSalt();
        const passwordHash = await hashPassword(password, salt);

        await db.user.create({
            data: {
                username,
                email,
                passwordHash,
                salt,
            },
        });

        if (data == null){
            return "Unable to create account";
        }

    } catch (error) {
        return "Unable to create account";
    }
    
    redirect("/")
    
}