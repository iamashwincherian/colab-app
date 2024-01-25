import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const callbackExceptionUrls = ["/auth/verify-email"];

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
  const xURL = headers().get("x-url") || "";

  const callbackUrl = !callbackExceptionUrls.includes(xURL)
    ? `?callback=${xURL}`
    : "";

  if (!user) redirect("/auth/signin" + callbackUrl);
  if (!user.emailVerified) redirect("/auth/verify-email" + callbackUrl);
  return user;
};
