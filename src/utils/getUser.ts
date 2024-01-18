import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  const session = await getServerSession();
  if (!session?.user) return;

  const email = session.user.email;
  if (!email) return;

  const user = await db.user.findFirst({ where: { email } });
  return user;
};

export const authenticateUser = async () => {
  const user = await getCurrentUser();
  const callbackUrl = `?callback=${headers().get("x-url")}`;
  if (!user) redirect("/auth/signin" + callbackUrl);
  if (!user.emailVerified) redirect("/auth/verify-request" + callbackUrl);
  return user;
};
