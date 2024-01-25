import Link from "next/link";
import { getProviders } from "next-auth/react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SigninForm from "@/app/auth/_forms/SigninForm";

export default async function SigninPage() {
  const providers = await getProviders();

  return (
    <Card className="w-[400px]">
      <CardHeader className="pb-3">
        <p className="text-xl font-regular">Login</p>
        <small className="text-gray-400 ">Welcome back</small>
      </CardHeader>
      <CardContent>
        <SigninForm providers={providers} />
        <Link href={"/auth/register"}>
          <p className="text-sm text-center dark:text-gray-300">
            Don’t have an account yet?{" "}
            <span className="text-primary cursor-pointer hover:text-primary-dark">
              Sign up
            </span>
          </p>
        </Link>
      </CardContent>
    </Card>
  );
}
