import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth ;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup");
    const isProtectedPage = req.nextUrl.pathname.startsWith('/editor') || req.nextUrl.pathname.startsWith('/user') || req.nextUrl.pathname.startsWith('/dashboard')

    if(isProtectedPage && !isLoggedIn){
        return NextResponse.redirect(new URL('/login',req.url))
    };
    if (isAuthPage && isLoggedIn){
        return NextResponse.redirect(new URL('/',req.url))
    };
    return NextResponse.next();
})

export const config = {
    matcher : ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}