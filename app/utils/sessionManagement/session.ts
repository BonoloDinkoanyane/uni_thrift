import { z } from "zod";
import crypto from "crypto";
import { redisClient } from "../../redis/redis";

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
  delete: (key: string ) => void;
};

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 1 week
const COOKIE_SESSION_KEY= "sessionId"; //name of the cookie session to store

//if i wanted to create a session cookie for a user solely using nextjs
//i could directly use the cookies object from next.js

// function only selects the set property from the Cookies type
export async function createSession(user: userSession, cookies: Pick<Cookies, "set">){

    //creating a brand new generic session id to assign to the user
    //512 bytes because the session should be large and hard to guess
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();
    await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), { 
        ex: SESSION_EXPIRATION_SECONDS // 1 week expiration
    });

    setCookie(sessionId, cookies)
}

//function only selects the get property from the Cookies type
export function getUserFromSession(cookies: Pick<Cookies, "get">){

  //fetches the sessionId from the cookies
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) {
    return null;
  }

  //returns the user session data associated with the sessionId
  return getUserSessionById(sessionId);
}

//accesses the storage (redis) to get the user session data by sessionId to get the user information 
async function getUserSessionById( sessionId: string){
  const rawUser = await redisClient.get(`session:${sessionId}`);

  const {success, data: user} = sessionSchema.safeParse(rawUser);

  return success ?  user : null;
}

// function only selects the set property from the Cookies type
function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true, //makes sure it is always encrypted when it is sent over the network
    httpOnly: true, //makes sure it is sent only over http(s) and the server, and not accessible via JS
    sameSite: "lax", //allows us to access the cookie on the server even if the request comes from another site/redirect 
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  })
}