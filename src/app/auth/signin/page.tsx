import { getProviders } from "next-auth/react";

import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/components/logo/logo";
import SigninForm from "../_forms/SigninForm";

export default async function SigninPage() {
  const providers = await getProviders();

  return (
    <FullScreenLayout>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="md:col-span-2 md:mt-0">
          <div className="flex flex-col justify-center items-center mb-2 pb-2">
            <Logo />
            <p className="text-lg my-4 font-semibold dark:text-gray-300">
              Welcome to Colab
            </p>
          </div>
          <Card className="w-[400px]">
            <CardHeader className="pb-3">
              <p className="text-xl font-regular">Login</p>
              <small className="text-gray-400 ">Welcome back</small>
            </CardHeader>
            <CardContent>
              <SigninForm providers={providers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </FullScreenLayout>
  );
}
