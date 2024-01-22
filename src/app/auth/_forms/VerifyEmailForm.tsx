"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verifyEmailSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useVerifyEmail from "../_hooks/useVerifyEmail";

export default function VerifyEmailForm() {
  const { verifyOtp, otpRefs, handleInput, resendVerification } =
    useVerifyEmail();

  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { otp1: "", otp2: "", otp3: "", otp4: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(verifyOtp)}>
        <div className="flex justify-between gap-2 mb-3">
          <FormField
            control={form.control}
            name="otp1"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-16 h-20 text-4xl text-center"
                    pattern="\d*"
                    maxLength={1}
                    ref={otpRefs[0]}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInput(0, e);
                    }}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp2"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-16 h-20 text-4xl text-center"
                    pattern="\d*"
                    maxLength={1}
                    ref={otpRefs[1]}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInput(1, e);
                    }}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp3"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-16 h-20 text-4xl text-center"
                    pattern="\d*"
                    maxLength={1}
                    ref={otpRefs[2]}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInput(2, e);
                    }}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="otp4"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="w-16 h-20 text-4xl text-center"
                    pattern="\d*"
                    maxLength={1}
                    ref={otpRefs[3]}
                    onChange={(e) => {
                      field.onChange(e);
                      handleInput(3, e);
                    }}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="full" className="my-2">
          Verify
        </Button>
        <Button
          type="button"
          size="full"
          variant="ghost"
          className="hover:bg-inherit"
          onClick={resendVerification}
        >
          Resend Email
        </Button>
      </form>
    </Form>
  );
}
