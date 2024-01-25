import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VerifyEmailForm from "@/app/auth/_forms/VerifyEmailForm";
import { authenticateUser } from "@/utils/getUser";

const VerifyPage = async () => {
  await authenticateUser();

  return (
    <Card>
      <CardHeader className="pb-3">
        <p className="text-xl font-regular">Verify Email</p>
        <small className="text-gray-400 ">
          Enter the 4 digit PIN we have sent to your email
          <br />
          to continue
        </small>
      </CardHeader>
      <CardContent>
        <VerifyEmailForm />
      </CardContent>
    </Card>
  );
};

export default VerifyPage;
