import { NextResponse, NextRequest } from 'next/server'; 
import { auth } from "@/app/utils/auth";

//these are the routes that require authentication
// For example, protecting all routes under /dashboard
// matcher: ["/dashboard/:path*"],
const protectedRoutes = ['/profile', '/protected-route-2'];

export default async function middleware(req: NextRequest) {

    const session = await auth();

    //pathname of the current url
    const {pathname} = req.nextUrl;
    
    //checks if the requested route is protected by chaecking if 
    // it starts with the route name we are protecting, if it is then the route is protected
    const isProtectedRoute = protectedRoutes.some((route) => 
        pathname.startsWith(route));

    if (isProtectedRoute && !session) {
        //if the route is protected and there is no session, redirect to login
        const loginUrl = new URL('/api/auth/signin', req.url);
        return NextResponse.redirect(loginUrl);
    }

    //the 'next' function allows the request to proceed to the requested url
    return NextResponse.next();
}