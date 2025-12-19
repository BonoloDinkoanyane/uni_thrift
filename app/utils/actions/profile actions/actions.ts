import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { getUserFromSession } from "../../sessionManagement/session";
import { getCookiesAdapter } from "../../sessionManagement/cookiesAdapter";
import { requireUser } from "../../hooks";
import { cookies } from "next/headers";
import { registerSchema } from "../../zodSchema";

export async function editProfile(prevState: any, formData: FormData){

    try{
        const currentUser = await requireUser();

        //an extra check for added redundancy
        if (!currentUser) {
            return { error: "Log in to edit your profile" };
        }

        const submission = parseWithZod(formData, {
            schema: registerSchema, 
        });

        if (submission.status !== "success"){
            return submission.reply();
        }

        const updatedUser = await db.user.update({
            where: { 
                userId: currentUser?.userId 
            }, 
            data: { 

             }
        });

    } catch (error) {

    }
    
}

export async function updateAvatar(prevState: any, formData: FormData) {
    const user = await requireUser();
}

export async function deleteAccount(prevState: any, formData: FormData) {
    const user = await requireUser();
}

