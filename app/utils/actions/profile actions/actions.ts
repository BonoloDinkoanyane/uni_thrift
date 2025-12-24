'use server';

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { profileEditSchema } from "../../zodSchema";
import { logError, logInfo } from "@/lib/logger";
import { useAvailabilityCheck } from "../../hooks/availabilityCheck";
import { checkEmailAvailability, checkUsernameAvailability } from "../validation/actions";
import { revalidatePath } from "next/cache";
import { getCookiesAdapter } from "../../sessionManagement/cookiesAdapter";
import { getUserFromSession, updateSessionData } from "../../sessionManagement/session";

async function requireUser() {
    const cookiesAdapter = await getCookiesAdapter();
    const session = await getUserFromSession(cookiesAdapter);
    
    if (!session) {
        redirect("/login");
    }
    
    return session;
}

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

        // storing the OLD username before updating
        const oldUsername = currentUser.username;
        const newUsername = submission.value.username;

        // Step 4: Check if username changed and if new username is taken
        if (newUsername !== oldUsername) {
            const existingUser = await db.user.findFirst({
                where: {
                    username: newUsername,
                    userId: { not: currentUser.userId }, // excludes the current user
                },
            });
            
            if (existingUser) {
                //returning the validation error using the conform's reply method
                return submission.reply({
                    fieldErrors: {
                        username: ["Username is already taken"],
                    },
                });
            }
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
            },
            select: {
                username: true,
                email: true,
                isVerified: true,
                isBanned: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        // its important to update the session with new data because
        // this keeps Redis session in sync with database
        if (newUsername !== oldUsername) {
            const cookiesAdapter = await getCookiesAdapter();
            await updateSessionData(cookiesAdapter, {
                userId: currentUser.userId,
                username: updatedUser.username, // New username
                email: updatedUser.email,
                isVerified: updatedUser.isVerified,
                isBanned: updatedUser.isBanned,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
            });
        }

        // revalidate the old and new profile pages
        // this clears Next.js cache so the new username appears immediately
        revalidatePath(`/${oldUsername}`);
        revalidatePath(`/${updatedUser.username}`);
        revalidatePath(`/${updatedUser.username}/edit`);

        logInfo("editProfile", "Profile updated successfully", { 
            userId: currentUser.userId,
            oldUsername,
            newUsername: updatedUser.username,
        });

        // returning the success status with the NEW username
        return { 
            status: 'success' as const,
            value: {
                username: updatedUser.username, // this is the NEW username
            },
        };

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

