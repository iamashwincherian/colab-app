"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { passwordResetSchema } from "@/schemas/auth";
import { changePassword } from "@/services/auth/resetPassword";
import { User } from "@prisma/client";
import { useToast } from "@/components/ui/toast/use-toast";
import { useRouter } from "next/navigation";

interface PasswordResetFormType {
  user: User;
}

export default function PasswordResetForm({ user }: PasswordResetFormType) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof passwordResetSchema>>({
    defaultValues: { password: "" },
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = () => {
    if (!user) return;

    const password = form.getValues("password");
    changePassword(password, user)
      .then(() => {
        toast({ description: "Your password has been updated!" });
        router.push("/auth/signin");
      })
      .catch(() => toast({ description: "Failed to change your password" }));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit" variant="default" size="full" className="my-4">
          Login
        </Button>
      </form>
    </Form>
  );
}
