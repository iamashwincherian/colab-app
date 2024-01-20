"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import FullScreenLayout from "../../../components/layouts/FullScreenLayout";
import Logo from "../../../components/logo/logo";
import GoogleButton from "../components/buttons/GoogleButton";
import { useToast } from "@/components/ui/toast/use-toast";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { registerCredentialSchema } from "@/app/api/auth/[...nextauth]/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export default function RegisterPage({ providers }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [google, setGoogle] = useState<GoogleProvider>(null);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const form = useForm<z.infer<typeof registerCredentialSchema>>({
    resolver: zodResolver(registerCredentialSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    disabled: disableSubmitButton,
  });

  useEffect(() => {
    if (providers) {
      setGoogle(providers.google);
    }
  }, [providers]);

  const handleRegistration = async () => {
    if (disableSubmitButton) return;

    setDisableSubmitButton(true);
    const callbackUrl = searchParams?.get("callback") || "/";
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
        router.push(callbackUrl);
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
          <Card>
            <CardHeader className="pb-3">
              <p className="text-xl font-regular">Register</p>
              <small className="text-gray-400 ">Become a part of Colab</small>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRegistration)}>
                  <div className="mb-5">
                    {google && <GoogleButton type="register" id={google.id} />}
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
                    <p className="mx-4 dark:text-gray-200">or</p>
                    <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="firstName"
                              placeholder="John"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="lastName"
                              placeholder="Doe"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
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
                  <Button
                    type="submit"
                    size="full"
                    className="my-4"
                    disabled={disableSubmitButton}
                  >
                    Register
                  </Button>
                  <Link href={"/auth/signin"}>
                    <p className="text-sm text-center dark:text-gray-300">
                      Already have an account?{" "}
                      <span className="text-primary cursor-pointer hover:text-primary-dark">
                        Login
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
