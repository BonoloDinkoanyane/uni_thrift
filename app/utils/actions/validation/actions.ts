"use server";

import { db } from "@/lib/db";
import { logDebug } from "@/lib/logger";

/**
 * Check if username is available
 * Returns true if available, false if taken
 */
export async function checkUsernameAvailability(username: string): Promise<{
    available: boolean;
    message?: string;
}> {
    try {
        // Validate input
        if (!username || username.length < 3) {
            return { 
                available: false, 
                message: "Username must be at least 3 characters" 
            };
        }

        if (username.length > 30) {
            return { 
                available: false, 
                message: "Username must be less than 30 characters" 
            };
        }

        // Check if username contains only valid characters
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return { 
                available: false, 
                message: "Username can only contain letters, numbers, and underscores" 
            };
        }

        // Check database
        const existingUser = await db.user.findFirst({
            where: { 
                username: {
                    equals: username,
                    mode: 'insensitive', // Case-insensitive search
                }
            },
            select: { userId: true }
        });

        if (existingUser) {
            return { 
                available: false, 
                message: "Username already exists" 
            };
        }

        logDebug("checkUsernameAvailability", "Username is available", { username });
        
        return { 
            available: true, 
            message: "Username is available" 
        };

    } catch (error) {
        console.error("Error checking username availability:", error);
        return { 
            available: false, 
            message: "Unable to check availability" 
        };
    }
}

/**
 * Check if email is available
 * Returns true if available, false if taken
 */
export async function checkEmailAvailability(email: string): Promise<{
    available: boolean;
    message?: string;
}> {
    try {
        // Validate input
        if (!email) {
            return { 
                available: false, 
                message: "Email is required" 
            };
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { 
                available: false, 
                message: "Invalid email format" 
            };
        }

        // Check database
        const existingUser = await db.user.findFirst({
            where: { 
                email: {
                    equals: email,
                    mode: 'insensitive', // Case-insensitive search
                }
            },
            select: { userId: true }
        });

        if (existingUser) {
            return { 
                available: false, 
                message: "Email is already registered" 
            };
        }

        logDebug("checkEmailAvailability", "Email is available", { email });
        
        return { 
            available: true, 
            message: "Email is available" 
        };

    } catch (error) {
        console.error("Error checking email availability:", error);
        return { 
            available: false, 
            message: "Unable to check availability" 
        };
    }
}