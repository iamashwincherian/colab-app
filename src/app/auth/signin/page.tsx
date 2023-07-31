import { getProviders } from "next-auth/react";
import SigninPage from "./signIn";

export default async function SignIn() {
  const providers = await getProviders();
  return <SigninPage providers={providers} />;
}
