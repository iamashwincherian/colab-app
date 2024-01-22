"use client";

import { Fragment } from "react";
import Link from "next/link";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleButton from "../_components/GoogleButton";
import { loginCredentialSchema } from "@/schemas/auth";
import useSignin from "../_hooks/useSignin";

interface SigninFormPropType {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export default function SigninForm({ providers }: SigninFormPropType) {
  const { handleLogin, formDisabled } = useSignin();

  const form = useForm<z.infer<typeof loginCredentialSchema>>({
    resolver: zodResolver(loginCredentialSchema),
    defaultValues: { email: "", password: "" },
    disabled: formDisabled,
  });

  return (
    <Fragment>
      <div className="mb-5">
        {providers?.google && (
          <GoogleButton type="login" id={providers.google?.id} />
        )}
      </div>
      <div className="flex items-center">
        <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
        <p className="mx-4 dark:text-gray-200">or</p>
        <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => handleLogin(form))}>
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
                  <Input {...field} type="password" placeholder="••••••••" />
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
            disabled={formDisabled}
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
    </Fragment>
  );
}
