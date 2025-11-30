import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth0 } from "@/lib/auth0";

export async function requireUser(){
    const session = await auth0.getSession();
    
        if (!session?.user){
            redirect("/login")
        }
    return session;
}
