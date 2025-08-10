import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

interface UserWithRole {
  id: string;
  name: "Admin" | null;
  role: "admin" | null;
}

interface SessionWithRole {
  user: {
    name: string | null;
    role: string | null;
  };
  expires: string;
}

interface TokenWithRole extends JWT {
  role?: string | null;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === process.env.ADMIN_USER &&
          credentials?.password === process.env.ADMIN_PASS
        ) {
          const user: UserWithRole = {
            id: "1",
            name: "Admin",
            role: "admin",
          };
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as UserWithRole).role ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      const tokenWithRole = token as TokenWithRole;
      (session as SessionWithRole).user.role = tokenWithRole.role ?? null;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/admin/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
