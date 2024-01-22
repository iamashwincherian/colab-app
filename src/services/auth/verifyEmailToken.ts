"use server";

import { db } from "@/server/db";
import { getCurrentUser } from "@/utils/getUser";
import { z } from "zod";

const otpSchema = z
  .string()
  .length(4, { message: "PIN should contain 4 digits" });

export default async function verifyEmailToken(
  token: string
): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  otpSchema.parse(token);
  const existingToken = await db.verificationToken.findFirst({
    where: { token, user },
  });

  if (existingToken) {
    await db.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
    return true;
  }

  return false;
}
