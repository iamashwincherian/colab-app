import { getProviders } from "next-auth/react";
import SignupPage from "./register";

export default async function SignIn() {
  const providers = await getProviders();
  return <SignupPage providers={providers} />;
}
