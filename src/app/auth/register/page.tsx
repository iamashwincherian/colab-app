import { getProviders } from "next-auth/react";
import RegisterPage from "./register";

export default async function SignIn() {
  const providers = await getProviders();
  return <RegisterPage providers={providers} />;
}
