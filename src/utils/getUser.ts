import { db } from "@/server/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
  if (!user) redirect("/auth/signin");
  return user;
};
