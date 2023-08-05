import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

import { db } from "@server/db";
import authorize from "@app/api/auth/[...nextauth]/authorize";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      authorize,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  // callbacks: {
  //   session: async ({ session }) => {
  //     let { user } = session;
  //     if (user && user.email) {
  //       user = (await db.user.findUnique({
  //         where: { email: user.email },
  //       })) as User;
  //     }

  //     session.user = user;
  //     return session;
  //   },
  // },
};
