//next auth confirguration file

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // You can add custom sign-in logic here, such as checking if the user exists in your database
            return true;
        },
        async session({ session, user, token }) {
            // You can add custom session logic here
            return session;
        },
    },
});