import { redirect } from "next/navigation";
import { getUserFromSession } from "../utils/sessionManagement/session";
import { getCookiesAdapter } from "../utils/sessionManagement/cookiesAdapter";
import { logDebug } from "@/lib/logger";

/**
 * Server-side hook to require authentication
 * Redirects to /login if user is not authenticated
 * @returns User session data
 */
export async function requireUser() {

    const cookiesAdapter = await getCookiesAdapter();
    const session = await getUserFromSession(cookiesAdapter);

    // log errors in development only
    if (process.env.NODE_ENV === "development") {

        if (session) {
            logDebug("[requireUser] Session userId:", session.userId);
        } else {
            if (!session) {
                logDebug("[requireUser]", "[requireUser] No session found, redirecting to /login");
            }
        }

    }

    if (!session) {
        redirect("/login");
    }

    return session;
}
