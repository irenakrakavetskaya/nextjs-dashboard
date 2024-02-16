import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    // use the pages option to specify the route for custom sign-in, sign-out, and error pages
    pages: {
        signIn: '/login', //user will be redirected to our custom login page
    },
    callbacks: {
        //authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
        //it is called before a request is completed, and it receives an object with the auth and request properties.
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user; //auth property contains the user's session
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');//request property contains the incoming request.
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
};// satisfies NextAuthConfig;