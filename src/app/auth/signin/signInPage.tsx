"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/use-toast";

import FullScreenLayout from "@/components/layouts/FullScreenLayout";
import GoogleButton from "@/app/auth/components/buttons/GoogleButton";
import Logo from "@/components/logo/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { loginCredentialSchema } from "@/app/api/auth/[...nextauth]/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type GoogleProvider = {
  id: string;
} | null;

export default function SigninPage({ providers }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [google, setGoogle] = useState<GoogleProvider>(null);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const form = useForm<z.infer<typeof loginCredentialSchema>>({
    resolver: zodResolver(loginCredentialSchema),
    defaultValues: { email: "", password: "" },
    disabled: disableSubmitButton,
  });

  useEffect(() => {
    if (providers) {
      setGoogle(providers.google);
    }
  }, [providers]);

  const handleLogin = async () => {
    if (disableSubmitButton) return;
    setDisableSubmitButton(true);
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
      .finally(() => setDisableSubmitButton(false));
  };

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
              <div className="mb-5">
                {google && <GoogleButton type="login" id={google?.id} />}
              </div>
              <div className="flex items-center">
                <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
                <p className="mx-4 dark:text-gray-200">or</p>
                <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            autoComplete="email"
                            placeholder="user@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full text-right my-2">
                    <a
                      className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-all"
                      href="#"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    size="full"
                    className="my-2"
                    disabled={disableSubmitButton}
                  >
                    Login
                  </Button>

                  <Link href={"/auth/register"}>
                    <p className="text-sm text-center dark:text-gray-300">
                      Don’t have an account yet?{" "}
                      <span className="text-primary cursor-pointer hover:text-primary-dark">
                        Sign up
                      </span>
                    </p>
                  </Link>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </FullScreenLayout>
  );
}
