import { z } from "zod";
import crypto from "crypto";

//the schema stores the shape of the user session object
const sessionSchema = z.object({
  userId: z.string().cuid(),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  isVerified: z.boolean(),
  isBanned: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

//userSession type is inferred from the sessionSchema/contains the same fields
export type userSession = z.infer<typeof sessionSchema>;

//Cookies type defines the shape of the cookies object used to manage cookies
//this method is framework-agnostic and can be adapted to different environments
export type Cookies = {
  set: (
    key: string, 
    value: string, 
    options: {
        httpOnly?: boolean;
        secure?: boolean;
        path?: string;
        expires?: number;
        sameSite?: "lax" | "strict" | "none";
    }) => void;
  get: (key: string) =>{ name: string; value: string } | undefined
  delete: (key: string, options?: { path?: string }) => void;
};

//if i wanted to create a session cookie for a user solely using nextjs
//i could directly use the cookies object from next.js
export function createSession(user: userSession, cookies: Cookies){

    //creating a brand new generic session id to assign to the user
    //512 bytes because the session should be large and hard to guess
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();

}