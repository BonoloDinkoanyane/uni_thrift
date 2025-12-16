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
    console.log("[requireUser] Starting authentication check");

    const cookiesAdapter = await getCookiesAdapter();
    console.log("[requireUser] Cookies adapter obtained");

    const session = await getUserFromSession(cookiesAdapter);
    console.log("[requireUser] Session retrieved:", session ? "Yes" : "No");

    if (session) {
        console.log("[requireUser] Session userId:", session.userId);
    }

    if (!session) {
        console.log("[requireUser] No session found, redirecting to /login");
        redirect("/login");
    }

    return session;
}
