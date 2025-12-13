"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { registerSchema } from "./utils/zodSchema";
import z from "zod";


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

export async function signUp(unsafeData: z.infer<typeof registerSchema>) {

    const { success, data } = registerSchema.safeParse(unsafeData);

    if (!success) {
        return "Unable to create account";
    }

    const existingUser = await db.user.findUnique({
        where: {
            username: data.username,
            email: data.email,
        },
    });

    if (existingUser) {
        return "Account already exists for this username/email";
    }

    redirect("/")
    
}