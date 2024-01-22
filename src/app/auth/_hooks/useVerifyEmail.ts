import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

import { useToast } from "@/components/ui/toast/use-toast";
import { verifyEmailSchema } from "@/schemas/auth";
import sendVerificationEmail from "@/services/auth/sendVerificationEmail";
import verifyEmailToken from "@/services/auth/verifyEmailToken";

export default function useVerifyEmail() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (otpRefs[0].current) {
      otpRefs[0].current.focus();
    }
  }, []);

  const handleInput = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length === 1 && index < 3) {
        otpRefs[index + 1].current?.focus();
      }
    },
    []
  );

  const resendVerification = useCallback(() => {
    sendVerificationEmail({ forceSend: true }).then(() =>
      toast({ description: "Resent verification email successfully!" })
    );
  }, []);

  const verifyOtp = (data: z.infer<typeof verifyEmailSchema>) => {
    const { otp1, otp2, otp3, otp4 } = data;
    const otp = otp1.concat(otp2).concat(otp3).concat(otp4);
    const callbackUrl = searchParams?.get("callback") || "/";

    verifyEmailToken(otp)
      .then((verified: boolean) => {
        if (verified) {
          toast({ description: "Email verified successfully!" });
          router.push(callbackUrl);
        } else {
          toast({ description: "Incorrect PIN" });
        }
      })
      .catch(() => {
        toast({ description: "Verification Failed" });
      });
  };

  return { otpRefs, handleInput, resendVerification, verifyOtp };
}
