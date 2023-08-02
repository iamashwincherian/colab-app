import { getProviders } from "next-auth/react";
import SignInPage from "./signInPage";

export default async function SignIn() {
  const providers = await getProviders();
  console.log("providers", providers);
  return <SignInPage providers={providers} />;
}
