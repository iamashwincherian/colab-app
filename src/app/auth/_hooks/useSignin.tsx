import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

import { useToast } from "@/components/ui/toast/use-toast";

type FormType = UseFormReturn<
  {
    email: string;
    password: string;
    isRegistration: boolean;
  },
  any,
  undefined
>;

export default function useSignin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const [formDisabled, setFormDisabled] = useState<boolean>(false);

  const handleLogin = (form: FormType) => {
    if (formDisabled) return;
    setFormDisabled(true);
    form.clearErrors();

    const callbackUrl = searchParams?.get("callback") || "/";
    signIn("credentials", {
      email: form.getValues("email"),
      password: form.getValues("password"),
      redirect: false,
    })
      .then((response) => {
        if (!response) return;

        if (response.error) {
          if (response.error === "INVALID_CREDENTIALS") {
            toast({ description: "Email or password is invalid!" });
          } else {
            toast({ description: "Login failed!" });
          }
        } else {
          toast({ description: "Logged in successfully!" });
          router.push(callbackUrl);
        }
      })
      .catch(() => toast({ description: "Something went wrong!" }))
      .finally(() => setFormDisabled(false));
  };

  return { handleLogin, formDisabled };
}
