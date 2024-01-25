import { getProviders } from "next-auth/react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RegisterForm from "@/app/auth/_forms/RegisterForm";

export default async function RegisterPage() {
  const providers = await getProviders();

  return (
    <Card>
      <CardHeader className="pb-3">
        <p className="text-xl font-regular">Register</p>
        <small className="text-gray-400 ">Become a part of Colab</small>
      </CardHeader>
      <CardContent>
        <RegisterForm providers={providers} />
      </CardContent>
    </Card>
  );
}
