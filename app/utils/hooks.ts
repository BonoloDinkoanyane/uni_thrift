import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserFromSession } from "../utils/sessionManagement/session";
import { getCookiesAdapter } from "../utils/sessionManagement/cookiesAdapter";

/**
 * Server-side hook to require authentication
 * Redirects to /login if user is not authenticated
 * @returns User session data
 */
export async function requireUser() {
    const cookiesAdapter = await getCookiesAdapter();
    const session = await getUserFromSession(cookiesAdapter);

    if (!session) {
        redirect("/login");
    }

    return session;
}
