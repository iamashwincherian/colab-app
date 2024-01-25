"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordResetEmailSchema } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import resetPassword from "@/services/auth/resetPassword";
import { useToast } from "@/components/ui/toast/use-toast";
import Link from "next/link";

export default function PasswordResetPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof passwordResetEmailSchema>>({
    resolver: zodResolver(passwordResetEmailSchema),
    defaultValues: { email: "" },
  });

  const handlePasswordReset = ({ email }: { email: string }) => {
    resetPassword({ email })
      .then((res) => {
        if (res?.error) {
          toast({ description: res.error });
        } else {
          toast({
            description: "Password reset link has been sent to your email!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Card className="w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePasswordReset)}>
            <CardHeader className="pb-3">
              <p className="text-xl font-regular">Reset Password</p>
              <small className="text-gray-400 ">
                We’ll send you an email with instructions on how to reset your
                password
              </small>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <div className="flex flex-col items-center w-full gap-3">
                <Button type="submit" size="full">
                  Submit
                </Button>
                <Link href="/auth/signin">
                  <p className="text-sm dark:text-gray-300">
                    Go back to Login page
                  </p>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </React.Fragment>
  );
}
