import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher(["/", "(auth)(.*)", "/medsearch", "/nearbycenters"]);

export default clerkMiddleware(async(auth, req) => {
    const { userId } = await auth();  

    if (isPublicRoute(req)) {
        return NextResponse.next();
    }

    if (isProtectedRoute(req) && !userId) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
