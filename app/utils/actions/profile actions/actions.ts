import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { getUserFromSession } from "../../sessionManagement/session";
import { getCookiesAdapter } from "../../sessionManagement/cookiesAdapter";

export async function editProfile(userId: string){

    const cookiesAdapter = await getCookiesAdapter();
    const session = await getUserFromSession(cookiesAdapter);
    
}