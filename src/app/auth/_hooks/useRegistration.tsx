import { useState } from "react";
import { signIn } from "next-auth/react";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/toast/use-toast";

type FormType = UseFormReturn<
  {
    email: string;
    isRegistration: boolean;
    firstName: string;
    password: string;
    lastName: string;
  },
  any,
  undefined
>;

export default function useRegistration() {
  const router = useRouter();
  const { toast } = useToast();

  const [formDisabled, setFormDisabled] = useState<boolean>(false);

  const handleRegistration = (form: FormType) => {
    if (formDisabled) return;

    setFormDisabled(true);
    signIn("credentials", {
      firstName: form.getValues("firstName"),
      lastName: form.getValues("lastName"),
      email: form.getValues("email"),
      password: form.getValues("password"),
      isRegistration: true,
      redirect: false,
    })
      .then((response) => {
        if (!response) return;
        if (response.error) {
          return toast({ description: "Registration Failed!" });
        }
        toast({
          title: "Registered successfully!",
          description: "Verification pin has been sent to your email id.",
        });
        router.push("/auth/verify-email");
      })
      .catch(() => toast({ description: "Something went wrong!" }))
      .finally(() => setFormDisabled(false));
  };

  return { handleRegistration, formDisabled };
}
