const API_HOST = 'http://127.0.0.1:8000/api'

const callbacks = {
  async signIn({account, profile}: any) {
    if(!(account && profile)) return
    if (account?.provider === "google") {
      return profile.email_verified && profile.email.endsWith("@gmail.com")
    }
    return true
  },
  async jwt({ token, account, profile }: any) {
    if (!account) return token;
  
    const data = await fetch(`${API_HOST}/auth/google/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id_token: account.id_token }),
    }).then(res => res.json());
    token = {
      token: data.token,
      email: data.user.email,
      username: data.user.username,
      name: data.user.name,
      is_staff: data.user.is_staff,
      is_active: data.user.is_active,
      last_login: data.user.last_login,
      date_joined: data.user.date_joined,
    };
    return token;
  },
  async session({ session, token, user }: any) {
    session = {
      ...session,
      user: token
    }
    return session
  }
}

export default callbacks