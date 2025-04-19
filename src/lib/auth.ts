// src/lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sql } from '@vercel/postgres';

// This is the shape of the user object returned from the database
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to the token when user signs in
      if (user) {
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to the session from the token
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async authorized({ auth, request }) {
      // For admin routes, check if user has admin role
      const user = auth?.user;
      const isAdminRoute = 
        request.nextUrl.pathname.startsWith('/admin') ||
        request.nextUrl.pathname.startsWith('/api/admin');
      
      if (isAdminRoute) {
        return user?.role === 'admin';
      }
      
      return true;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          // Query the database for the user
          const result = await sql`
            SELECT * FROM users WHERE email = ${credentials.email} LIMIT 1
          `;
          
          if (result.rows.length === 0) {
            return null;
          }
          
          const user = result.rows[0] as User;
          
          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isPasswordValid) {
            return null;
          }
          
          // Return user object without password
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      }
    })
  ],
});

// Add this to src/middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
// NextRequest is imported in middleware.ts, not needed here
// import type { NextRequest } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthorized = req.auth?.user?.role === "admin";
  
  // Protect admin routes
  if (
    (nextUrl.pathname.startsWith("/admin") || 
     nextUrl.pathname.startsWith("/api/admin")) && 
    !isAuthorized
  ) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
