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
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type GoogleProvider = {
  id: string;
} | null;

export default function RegisterPage({ providers }: any) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [google, setGoogle] = useState<GoogleProvider>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastNmae] = useState("");

  const checkForCallbackError = () => {
    const error = searchParams?.get("error");
    if (error === "Callback") {
    }
  };

  useEffect(() => {
    checkForCallbackError();
  }, []);

  useEffect(() => {
    if (providers) {
      setGoogle(providers.google);
    }
  }, [providers]);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const callbackUrl = searchParams?.get("callback") || "/";
    await signIn("credentials", {
      isRegistration: true,
      name: `${firstName} ${lastName}`.trim(),
      redirect: true,
      email,
      password,
      callbackUrl,
    }).then(() => {
      toast({
        description: "Verification email sent successfully!",
      });
    });
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
              <form onSubmit={handleRegistration}>
                <div className="mb-5">
                  {google && <GoogleButton type="register" id={google.id} />}
                </div>
                <div className="flex items-center mb-3">
                  <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
                  <p className="mx-4 dark:text-gray-200">or</p>
                  <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex gap-2 mb-3">
                  <div>
                    <Label htmlFor="email-address">First Name</Label>
                    <Input
                      id="first-name"
                      type="text"
                      name="first-name"
                      autoComplete="first-name"
                      value={firstName}
                      placeholder={"John"}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email-address">Last Name</Label>
                    <Input
                      id="last-name"
                      type="text"
                      name="last-name"
                      autoComplete="last-name"
                      value={lastName}
                      placeholder={"Doe"}
                      onChange={(e) => setLastNmae(e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <Label htmlFor="email-address">Email</Label>
                  <Input
                    id="email-address"
                    type="text"
                    name="email-address"
                    autoComplete="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder="••••••••"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" size="full" className="my-2">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </FullScreenLayout>
  );
}
