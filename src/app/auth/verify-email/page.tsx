import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VerifyEmailForm from "@/app/auth/_forms/VerifyEmailForm";
import Logo from "@/components/logo/logo";

const VerifyPage = () => {
  return (
    <FullScreenLayout nav>
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
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default VerifyPage;
