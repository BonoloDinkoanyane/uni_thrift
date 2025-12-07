"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { registerSchema } from "./utils/zodSchema";
import { requireUser } from "./utils/hooks";


export async function registerUser(prevState: any, formData: FormData) {
    const session = await requireUser();

    // session is guaranteed to exist here because requireUser redirects if not
    const auth0Id = session!.user.sub;
    if (!auth0Id) {
        throw new Error("Account does not exist");
    }

    const submission = parseWithZod(formData, {
        schema: registerSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await db.user.update({
        where: {
            auth0Id,
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