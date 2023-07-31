import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// import { signIn, jwt, session, authorize } from "./callbacks";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
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
      authorize: async (credentials: any, req: any) => {
        const {
          email,
          password,
          firstName = null,
          lastName = null,
          isSignup,
        } = credentials;
        console.log(credentials);
        // const url = isSignup ? REGISTER_URL : LOGIN_URL

        // const user = await getUser(url, email, password, firstName, lastName)

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
    newUser: "/auth/register",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  // callbacks: { signIn, jwt, session },
});

export { handler as GET, handler as POST };
