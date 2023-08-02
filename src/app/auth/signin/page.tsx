import { getProviders } from "next-auth/react";
import SignInPage from "./signInPage";

export default async function SignIn() {
  const providers = await getProviders();
  return <SignInPage providers={providers} />;
}
