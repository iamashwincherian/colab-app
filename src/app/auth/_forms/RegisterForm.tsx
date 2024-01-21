"use client";

import { Fragment } from "react";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GoogleButton from "../_components/GoogleButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerCredentialSchema } from "@/app/api/auth/[...nextauth]/schemas";
import useRegistratiom from "../_hooks/useRegistration";

interface RegisterFormPropType {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export default function RegisterForm({ providers }: RegisterFormPropType) {
  const { handleRegistration, formDisabled } = useRegistratiom();

  const form = useForm<z.infer<typeof registerCredentialSchema>>({
    resolver: zodResolver(registerCredentialSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    disabled: formDisabled,
  });

  return (
    <Fragment>
      <div className="mb-5">
        {providers?.google && (
          <GoogleButton type="register" id={providers.google.id} />
        )}
      </div>
      <div className="flex items-center mb-3">
        <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
        <p className="mx-4 dark:text-gray-200">or</p>
        <div className="h-0.5 bg-gray-200 dark:bg-gray-600 w-full"></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => handleRegistration(form))}>
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
                  <Input {...field} type="password" placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="full"
            className="my-4"
            disabled={formDisabled}
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
    </Fragment>
  );
}
