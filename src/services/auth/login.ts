"use server";

import bcrypt from "bcrypt";
import { db } from "@/server/db";
import { signIn } from "next-auth/react";

interface LoginProps {
  email: string;
  password: string;
}

export default async function login(values: LoginProps) {
  const { email, password } = values;

  let user = await db.user.findUnique({ where: { email } });
  if (!user) return;

  const passwordValid = await bcrypt.compare(password, user.hash || "");
  if (!passwordValid) return;

  await signIn("credentials", {
    email,
    password,
    redirect: true,
  });
}
