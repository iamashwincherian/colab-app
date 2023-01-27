"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

import FullScreenLayout from "../../../components/layouts/FullScreenLayout";
import Logo from "../../../components/logo/logo";
import GoogleButton from "../components/buttons/GoogleButton";

export default function SigninPage({ providers }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { google } = providers;

  const checkForCallbackError = () => {
    const error = searchParams.get("error");
    if (error === "Callback") {
      enqueueSnackbar("Authentication failed", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    checkForCallbackError();
  }, []);

  return (
    <FullScreenLayout>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="flex flex-col justify-center items-center my-2 py-2">
            <Logo />
            <p className="text-lg my-4 font-semibold dark:text-gray-300">
              Welcome to Colab
            </p>
          </div>
          <div className="overflow-hidden shadow sm:rounded-lg">
            <div className="w-[400px] bg-white dark:bg-dark-2 dark:text-gray-300 px-4 py-5 sm:p-6 ">
              <form>
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
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    placeholder="user@example.com"
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
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    placeholder="••••••••"
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
                  onClick={() => router.push("/")}
                  type={"button"}
                  className="bg-primary hover:bg-primary-dark text-white w-full my-3 py-2 rounded-md shadow transition-colors"
                >
                  Login
                </button>

                <p className="text-sm text-center dark:text-gray-300">
                  Don’t have an account yet?{" "}
                  <span className="text-primary cursor-pointer hover:text-primary-dark">
                    Sign up now
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FullScreenLayout>
  );
}
