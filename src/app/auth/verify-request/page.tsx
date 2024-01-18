"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import FullScreenLayout from "../../../components/layouts/FullScreenLayout";
import Logo from "../../../components/logo/logo";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import verifyEmailToken from "@/services/auth/verifyEmailToken";
import { useToast } from "@/components/ui/toast/use-toast";
import sendVerificationEmail from "@/services/auth/sendVerificationEmail";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/withAuth";

const VerifyPage = () => {
  const [selectedField, setSelectedField] = useState(0);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const otp1Ref = useRef<HTMLInputElement>(null);
  const otp2Ref = useRef<HTMLInputElement>(null);
  const otp3Ref = useRef<HTMLInputElement>(null);
  const otp4Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const otpFields = [otp1Ref, otp2Ref, otp3Ref, otp4Ref];
    if (selectedField < 4) {
      otpFields[selectedField].current?.focus();
    }
  }, [selectedField]);

  const verifyOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyEmailToken(otp).then((verified: boolean) => {
      if (verified) {
        toast({ description: "Email verified successfully!" });
        router.push("/");
      } else {
        toast({ description: "Incorrect PIN" });
      }
    });
  };

  const changeOtp = (value: string, otpIndex: number) => {
    if (value.length) setSelectedField(otpIndex + 1);
    setOtp(otp.concat(value));
  };

  const resendVerification = () => {
    sendVerificationEmail({ forceSend: true }).then(() =>
      toast({ description: "Resent verification email successfully!" })
    );
  };

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
              <form onSubmit={verifyOtp}>
                <div className="flex justify-between gap-2 mb-3">
                  <Input
                    className="w-16 h-20 text-4xl text-center"
                    name="otp1"
                    pattern="\d*"
                    maxLength={1}
                    ref={otp1Ref}
                    onChange={(e) => changeOtp(e.target.value, 0)}
                    required
                  />
                  <Input
                    className="w-16 h-20 text-4xl text-center"
                    name="otp2"
                    maxLength={1}
                    ref={otp2Ref}
                    onChange={(e) => changeOtp(e.target.value, 1)}
                    required
                  />
                  <Input
                    className="w-16 h-20 text-4xl text-center"
                    name="otp3"
                    maxLength={1}
                    ref={otp3Ref}
                    onChange={(e) => changeOtp(e.target.value, 2)}
                    required
                  />
                  <Input
                    className="w-16 h-20 text-4xl text-center"
                    name="otp4"
                    ref={otp4Ref}
                    onChange={(e) => changeOtp(e.target.value, 3)}
                    maxLength={1}
                    required
                  />
                </div>
                <Button type="submit" size="full" className="my-2">
                  Verify
                </Button>
                <Button
                  type="button"
                  size={"full"}
                  variant={"ghost"}
                  className="hover:bg-inherit"
                  onClick={resendVerification}
                >
                  Resend Email
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default withAuth(VerifyPage);
