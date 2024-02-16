import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;//exporting the auth property.

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    //matcher option specify that it should run on specific paths.
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};