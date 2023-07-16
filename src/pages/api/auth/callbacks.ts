const API_HOST = 'http://127.0.0.1:8000/api'
const LOGIN_URL = API_HOST + '/auth/login'
const REGISTER_URL = API_HOST + '/auth/register'

const getUser = async (url: string, email: string, password: string, firstName: string | null = null, lastName: string | null = null) => {
  return await fetch(url, {
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
}

const signIn = async ({account, profile}: any) => {
  if(!account) return false
  if (account?.provider === "google" && profile) {
    return profile.email_verified && profile.email.endsWith("@gmail.com")
  }
  return true
}

const jwt = async ({ token, account, user }: any) => {
  if (!account) return token;

  if(account.provider === "google") {
    user = await fetch(`${API_HOST}/auth/google/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ id_token: account.id_token }),
    }).then(res => res.json());
  }

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

  return token;
}

const session = async ({ session, token }: any) => {
  session = {
    ...session,
    user: token
  }
  return session
}

const authorize = async (credentials: any, req: any) => {
  const { email, password, firstName = null, lastName = null, isSignup } = credentials
  const url = isSignup ? REGISTER_URL : LOGIN_URL

  const user = await getUser(url, email, password, firstName, lastName)

  return user || null
}

export { signIn, jwt, session, authorize }