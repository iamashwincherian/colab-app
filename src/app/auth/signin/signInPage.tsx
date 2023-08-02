"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import FullScreenLayout from "../../../components/layouts/FullScreenLayout";
import Logo from "../../../components/logo/logo";
import GoogleButton from "../components/buttons/GoogleButton";

export default function SigninPage({ providers }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { google } = providers;
  const [email, setEmail] = useState("ashwin@colab.com");
  const [password, setPassword] = useState("colabtest");

  const checkForCallbackError = () => {
    const error = searchParams?.get("error");
    if (error === "Callback") {
    }
  };

  useEffect(() => {
    checkForCallbackError();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      // callbackUrl: "/auth/callback?auth=success",
      email,
      password,
      redirect: true,
    });
    if (response?.ok) {
      if (response.url) {
        router.replace(response.url);
      }
    } else {
    }
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
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="w-[400px] bg-white dark:bg-dark-2 dark:text-gray-300 px-4 py-5 sm:p-6 ">
              <form onSubmit={handleLogin}>
                <p className="text-xl font-regular">Login</p>
                <small className="mb-4 text-gray-400 ">Welcome back</small>
                <div className="my-5">
                  <GoogleButton type="login" id={google.id} />
                </div>

                <div className="flex items-center">
                  <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
                  <p className="mx-4 dark:text-gray-200">or</p>
                  <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
                </div>

                <div className="my-3">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    id="email-address"
                    type="text"
                    name="email-address"
                    autoComplete="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md dark:border-dark-2 dark:bg-dark border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md dark:border-dark-2 dark:bg-dark dark:text-gray-300 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
                <div className="w-full text-right my-2">
                  <a
                    className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-all"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type={"submit"}
                  className="bg-primary hover:bg-primary-dark text-white w-full my-3 py-2 rounded-md shadow transition-colors"
                >
                  Login
                </button>

                <Link href={"/auth/register"}>
                  <p className="text-sm text-center dark:text-gray-300">
                    Don’t have an account yet?{" "}
                    <span className="text-primary cursor-pointer hover:text-primary-dark">
                      Sign up
                    </span>
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FullScreenLayout>
  );
}
