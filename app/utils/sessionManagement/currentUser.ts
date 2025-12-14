import { cookies } from "next/headers";
import { cache } from "react";
import { getUserFromSession } from "./session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


// extraccts the the User type from getUserFromSession's return value
// Exclude removes null and undefined, leaving only the actual user object type
type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>

// extracts the FullUser type from getUserFromDb's return value
// this contains additional fields from the database (name, etc.)
type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>

function getUserFromDb(id: string) {
  return db.user.findFirst({
    select: { 
        userId: true, 
        email: true, 
        username: true 
    },
    where: { userId: id },
  })
}

/**
 * FUNCTION OVERLOADS
 * These define different return types based on the options provided
 * TypeScript uses these to provide accurate type checking at compile time
 */

// Overload 1: withFullUser=true, redirectIfNotFound=true
// Returns: FullUser (never null, redirects if not found)
function _getCurrentUser(options: {
  withFullUser: true
  redirectIfNotFound: true
}): Promise<FullUser>

// Overload 2: withFullUser=true, redirectIfNotFound=false/undefined
// Returns: FullUser | null (no redirect, can return null)
function _getCurrentUser(options: {
  withFullUser: true
  redirectIfNotFound?: false
}): Promise<FullUser | null>

// Overload 3: withFullUser=false/undefined, redirectIfNotFound=true
// Returns: User (never null, redirects if not found)
function _getCurrentUser(options: {
  withFullUser?: false
  redirectIfNotFound: true
}): Promise<User>

// Overload 4: withFullUser=false/undefined, redirectIfNotFound=false/undefined
// Returns: User | null (no redirect, can return null)
function _getCurrentUser(options?: {
  withFullUser?: false
  redirectIfNotFound?: false
}): Promise<User | null>

/**
 * Gets the current authenticated user with flexible options
 * 
 * @param withFullUser - If true, fetches complete user data from database
 * @param redirectIfNotFound - If true, redirects to sign-in when no user found
 * @returns User object (basic or full) or null, or redirects
 */
async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {

    // get user's session data from cookie
    // getUserFromSession reads the sessionId cookie and fetches session from Redis
    const user = await getUserFromSession(await cookies())

    // handle case when no user is logged in
    if (user == null) {
        if (redirectIfNotFound) return redirect("/sign-in")
        return null
    }

    //fetch full user data from database if requested
    if (withFullUser) {

        // query the database for additional user fields (like name)
        // session only contains basic info; database has the complete profile
        const fullUser = await getUserFromDb(user.userId)

        // This should never happen - where the user exists in the session but not in database
        // This indicates data inconsistency and is a critical error
        if (fullUser == null) throw new Error("User not found in database");

        return fullUser
    }

     // returns basic user from session (no database query needed)
    return user
}

// React's cache() ensures that within a single request/render cycle, multiple calls to getCurrentUser 
// return the same result without re-executing the function resulting in multiple DB calls
export const getCurrentUser = cache(_getCurrentUser)