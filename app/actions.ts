"use client";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { registerSchema } from "./utils/zodSchema";
import { requireUser } from "./utils/hooks";


export async function registerUser(prevState: any, formData: FormData) {
    const session = await requireUser();
    
    const submission = parseWithZod(formData, {
        schema: registerSchema, 
    });

    if (submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        }, 
        data: {
            name: submission.value.fullName,
            username: submission.value.username,
            email: submission.value.email,
            //onboardingComplete: true,
        }
    });

    //redirect to the browse page after successful onboarding
    return redirect("/browse");
}