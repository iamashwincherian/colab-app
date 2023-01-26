import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
const API_HOST = 'http://127.0.0.1:8000/api'

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
  },
  callbacks: {
    async signIn({account, profile}: any) {
      if(!(account && profile)) return
      if (account?.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com")
      }
      return true
    },
    async jwt({ token, account, profile }) {
      if (account) {
        const response = await fetch(API_HOST + '/auth/google/login/', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ id_token: account.id_token })
        })
          .then(res => res.json())
          .catch(err => console.log(err))

        token.id_token = response?.user.token
      }
      return token
    },
    async session({ session, token, user }: any) {
      session.user.token = token.id_token
      return session
    }
  }
})

