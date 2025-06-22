import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;