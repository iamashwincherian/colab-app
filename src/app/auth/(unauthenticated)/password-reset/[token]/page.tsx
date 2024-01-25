import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { validateResetToken } from "@/services/auth/resetPassword";
import PasswordResetForm from "@/app/auth/_forms/password-reset-form";

interface PasswordResetTokenPageProps {
  params: {
    token: string;
  };
}

export default async function PasswordResetTokenPage({
  params: { token },
}: PasswordResetTokenPageProps) {
  const tokenValid = await validateResetToken(token);

  return (
    <Card className="w-[400px]">
      <CardHeader className="pb-3">
        <p className="text-xl font-regular">Reset Password</p>
        <small className="text-gray-400 ">Enter the new password</small>
      </CardHeader>
      <CardContent>
        <PasswordResetForm user={tokenValid.user} />
        <Link href={"/auth/signin"}>
          <p className="text-sm text-center dark:text-gray-300">
            Go back to the login page
          </p>
        </Link>
      </CardContent>
    </Card>
  );
}
