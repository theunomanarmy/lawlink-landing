import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { prisma, isDatabaseAvailable } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Only use PrismaAdapter if database is available
  adapter: isDatabaseAvailable && prisma ? (PrismaAdapter(prisma) as any) : undefined,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo mode: Allow demo login when database is not available
        if (!isDatabaseAvailable || !prisma) {
          // Allow demo@lawlink.com with any password (or no password) in demo mode
          if (credentials?.email === "demo@lawlink.com") {
            return {
              id: "lawyer-01-user", // Demo user ID matching first lawyer from demo-lawyers.json
              email: "demo@lawlink.com",
              role: "LAWYER" as UserRole,
            };
          }
          return null;
        }

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  secret: process.env.AUTH_SECRET,
});

