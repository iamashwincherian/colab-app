const API_HOST = 'http://127.0.0.1:8000/api'
const LOGIN_URL = API_HOST + '/auth/login'
const REGISTER_URL = API_HOST + '/auth/register'

const signIn = async ({account, profile}: any) => {
  if(!(account && profile)) return true
  if (account?.provider === "google") {
    return profile.email_verified && profile.email.endsWith("@gmail.com")
  }
  return true
}

const jwt = async ({ token, account, profile }: any) => {
  if (!account) return token;

  if(account.provider === "google") {
    const user = await fetch(`${API_HOST}/auth/google/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id_token: account.id_token }),
    }).then(res => res.json());

    token = {
      token: user.token,
      email: user.email,
      username: user.username,
      name: user.name,
      is_staff: user.is_staff,
      is_active: user.is_active,
      last_login: user.last_login,
      date_joined: user.date_joined,
    };
  }

  return token;
}

const session = async ({ session, token, user }: any) => {
  session = {
    ...session,
    user: token
  }
  return session
}

const authorize = async (credentials: any) => {
  const { email, password, firstName = null, lastName = null,isSignup } = credentials
  const url = isSignup ? REGISTER_URL : LOGIN_URL

  const user = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
  })
    .then(res => {
      if(res.ok) return res.json()
      else {
        let errorMessage = "Registration failed!"
        if(res.status === 409) errorMessage = "User already exists!"
        throw new Error(errorMessage)
      }
    })

  return user || null
}

export { signIn, jwt, session, authorize }