import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TEMPORARY hardcoded check untuk MVP hackathon.
        // Ganti dengan password hash asli sebelum ini dipakai serius.
        if (
          credentials?.email === "owner@test.com" &&
          credentials?.password === "password"
        ) {
          const user = await db.user.findUnique({
            where: { email: "owner@test.com" },
          });
          return user ?? null;
        }
        if (
          credentials?.email === "staff@test.com" &&
          credentials?.password === "password"
        ) {
          const user = await db.user.findUnique({
            where: { email: "staff@test.com" },
          });
          return user ?? null;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
