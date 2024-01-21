import { getProviders } from "next-auth/react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import RegisterForm from "../_forms/RegisterForm";
import Logo from "@/components/logo/logo";

export default async function RegisterPage() {
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
          <Card>
            <CardHeader className="pb-3">
              <p className="text-xl font-regular">Register</p>
              <small className="text-gray-400 ">Become a part of Colab</small>
            </CardHeader>
            <CardContent>
              <RegisterForm providers={providers} />
            </CardContent>
          </Card>
        </div>
      </div>
    </FullScreenLayout>
  );
}
