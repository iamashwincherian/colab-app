"use server";

import { createTransport } from "nodemailer";
import { User } from "@prisma/client";
import { db } from "@/server/db";
import moment from "moment";

import { getCurrentUser } from "@/utils/getUser";
import { TEST_EMAIL_ID } from "@/utils/constants";

const isExpired = (date: Date) => {
  return moment(date).isAfter(moment());
};

export const createVerificationToken = async (user: User) => {
  if (!user) return;

  const expires = new Date(new Date().getDate() + 1);
  const token = Math.floor(1000 + Math.random() * 9000).toString();

  const existingToken = await db.verificationToken.findFirst({
    where: { userId: user.id },
  });

  if (existingToken) {
    await db.verificationToken.update({
      where: { userId: user.id, token: existingToken.token },
      data: { token, expires },
    });
  } else {
    await db.verificationToken.create({
      data: { userId: user.id, token, expires },
    });
  }

  return token;
};

const sendEmail = (to: string, token: string) => {
  const transport = createTransport(process.env.EMAIL_SERVER);

  if (process.env.NODE_ENV === "development") {
    to = TEST_EMAIL_ID;
  }

  transport.sendMail({
    to,
    from: "noreply@colabtest.com",
    subject: `Colab PIN: ${token}`,
    text: `Welcome to Colab. Use this PIN to verify your email Id. PIN : ${token}`,
    priority: "high",
  });

  if (process.env.NODE_ENV === "development") {
    console.log(`Email sent to: ${to}, with PIN: ${token}`);
  }
};

interface SendVerificationEmailProps {
  forceSend?: boolean;
  user?: User | null;
}

export default async function sendVerificationEmail({
  forceSend = false,
  user = null,
}: SendVerificationEmailProps) {
  if (!user) {
    user = (await getCurrentUser()) as User;
    if (!user) return;
  }

  let token = null;
  let existingToken = await db.verificationToken.findFirst({
    where: { userId: user.id },
  });

  if (existingToken && !isExpired(existingToken.expires)) {
    token = existingToken.token;
    if (forceSend) sendEmail(user.email, token);
  } else {
    token = await createVerificationToken(user);
    if (token) sendEmail(user.email, token);
  }

  return;
}
