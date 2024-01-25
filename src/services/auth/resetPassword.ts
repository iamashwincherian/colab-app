"use server";

import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import moment from "moment";
import { User } from "@prisma/client";

import { db } from "@/server/db";
import { TEST_EMAIL_ID } from "@/utils/constants";
import { createTransport } from "nodemailer";

export const validateResetToken = async (token: string) => {
  const resetToken = await db.passwordResetToken.findUnique({
    where: { token, expires: { gt: new Date() } },
    include: { user: true },
  });
  if (!resetToken) return { success: false };

  await db.passwordResetToken.update({
    where: { token },
    data: { expires: new Date() },
  });

  return { success: true, user: resetToken.user };
};

export const changePassword = async (password: string, user: User) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hashSync(password, salt);
  await db.user.update({ where: { id: user.id }, data: { hash } });
};

const createResetToken = async (user: User) => {
  const expires = moment().add(1, "days").toISOString();
  const token = randomUUID();

  const existingToken = await db.passwordResetToken.findFirst({
    where: { userId: user.id },
  });

  if (existingToken) {
    await db.passwordResetToken.update({
      where: { userId: user.id, token: existingToken.token },
      data: { token, expires },
    });
  } else {
    await db.passwordResetToken.create({
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

  const link = `${process.env.NEXTAUTH_URL}/auth/password-reset/${token}`;

  transport.sendMail({
    to,
    from: "noreply@colabtest.com",
    subject: `Colab Password Reset`,
    text: `Click on this link to reset your account password. \n${link}\n If this wasn't initiated by you, please ignore this email`,
    priority: "high",
  });

  if (process.env.NODE_ENV === "development") {
    console.log(`Email sent to: ${to}`);
  }
};

export default async function resetPassword({ email }: { email: string }) {
  const user = await db.user.findFirst({ where: { email } });
  if (!user) return { error: "A user with this email id doesn't exist!" };

  const token = await createResetToken(user);
  sendEmail(user.email, token);
}
