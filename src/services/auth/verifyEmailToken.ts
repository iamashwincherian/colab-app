"use server";

import { db } from "@/server/db";
import { getCurrentUser } from "@/utils/getUser";

export default async function verifyEmailToken(
  token: string
): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

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
