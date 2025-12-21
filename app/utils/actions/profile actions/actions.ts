'use server';

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { profileEditSchema } from "../../zodSchema";
import { logError, logInfo } from "@/lib/logger";
import { requireUser } from "../../hooks";

export async function editProfile(prevState: any, formData: FormData) {

    // Always parse FIRST so we have a SubmissionResult to reply with
    const submission = parseWithZod(formData, {
        schema: profileEditSchema,
    });

    try {
        const currentUser = await requireUser();

        //an extra check for added redundancy
        if (!currentUser) {
            return submission.reply({
                formErrors: ["Log in to edit your profile"],
            });
        }

        if (submission.status !== "success") {
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
                name: submission.value.name,
                username: submission.value.username,
                email: submission.value.email,
                bio: submission.value.bio || null,
            }
        });

        logInfo("editProfile", "Profile updated successfully", {
            userId: updatedUser.userId
        });

        // Return submission reply - form will stay filled with updated values
        return submission.reply({
            resetForm: false,
        });

    } catch (error) {
        logError("editProfile", error);
        return submission.reply({
            formErrors: ["Unable to update profile. Please try again."],
        });
    }

}

export async function changePassword(prevState: any, formData: FormData) {
    try {
        const user = await requireUser();
    } catch (error) {

    }
}

export async function updateAvatar(prevState: any, formData: FormData) {
    try {
        const user = await requireUser();

    } catch (error) {

    }
}

export async function deleteAccount(prevState: any, formData: FormData) {
    try {
        const user = await requireUser();
    } catch (error) {

    }
}

