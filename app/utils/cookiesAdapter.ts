import { cookies } from "next/headers";
import type { Cookies } from "./session";

/**
 * Cookies Adapter - Bridges Next.js cookies API to our custom Cookies interface
 * 
 * This adapter is crucial for maintaining clean architecture and framework independence.
 * It translates Next.js-specific cookie operations into our generic Cookies interface,
 * allowing our session management code to work with any framework (Next.js, Express, etc.)
 */
export async function getCookiesAdapter(): Promise<Cookies> {
    // Get Next.js cookies instance
    const cookieStore = await cookies();
    
    // Return an object that implements our Cookies interface
    return {
        /**
         * Set a cookie
         * Translates our generic options format to Next.js's specific format
         */
        set: (key, value, options) => {
            cookieStore.set(key, value, {
                httpOnly: options.httpOnly,
                secure: options.secure,
                path: options.path,
                // Next.js expects a Date object, we provide a timestamp
                expires: options.expires ? new Date(options.expires) : undefined,
                sameSite: options.sameSite,
            });
        },
        
        /**
         * Get a cookie
         * Transforms Next.js's RequestCookie type to our simpler format
         */
        get: (key) => {
            const cookie = cookieStore.get(key);
            // Next.js returns RequestCookie or undefined
            // We return our simpler { name, value } format or undefined
            return cookie ? { name: cookie.name, value: cookie.value } : undefined;
        },
        
        /**
         * Delete a cookie
         * Next.js's delete method has complex overloads, we simplify to single signature
         */
        delete: (key) => {
            cookieStore.delete(key);
        },
    };
}

// ## Why This Adapter Is CRITICAL

// ### 1. **Solves Type Incompatibility** 
// Without the adapter, TypeScript gives you this error:

// Argument of type 'ReadonlyRequestCookies' is not assignable to parameter of type 'Cookies'