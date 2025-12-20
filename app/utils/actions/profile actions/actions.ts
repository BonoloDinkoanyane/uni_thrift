import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { getUserFromSession } from "../../sessionManagement/session";
import { getCookiesAdapter } from "../../sessionManagement/cookiesAdapter";
import { requireUser } from "../../hooks";
import { cookies } from "next/headers";
import { profileEditSchema } from "../../zodSchema";
import { logError, logInfo } from "@/lib/logger";

export async function editProfile(prevState: any, formData: FormData){

    try{
        const currentUser = await requireUser();

        //an extra check for added redundancy
        if (!currentUser) {
            return { error: "Log in to edit your profile" };
        }

        const submission = parseWithZod(formData, {
            schema: profileEditSchema, 
        });

        if (submission.status !== "success"){
            return submission.reply();
        }

        // updating user profile in the database
        // Use currentUser.userId from session because its more secure as it 
        // only fetches data associated to that logged in user
        const updatedUser = await db.user.update({
            where: { 
                userId: currentUser?.userId 
            }, 
            data: { 
                name: submission.value.fullName,
                username: submission.value.username,
                email: submission.value.email,
                bio: submission.value.bio || null,
            }
        });

        logInfo("editProfile", "Profile updated successfully", { 
            userId: currentUser.userId 
        });

        return { 
            success: true, 
            message: "Profile updated successfully" 
        };

    } catch (error) {
        logError("editProfile", error);
        return { 
            error: "Unable to update profile. Please try again." 
        };
    }
    
}

export async function changePassword(prevState: any, formData: FormData) {
    try{
        const user = await requireUser();
    } catch (error){

    }
}

export async function updateAvatar(prevState: any, formData: FormData) {
    try{
        const user = await requireUser();

    } catch (error) {

    }
}

export async function deleteAccount(prevState: any, formData: FormData) {
    try{
        const user = await requireUser();
    } catch (error){

    }
}

