import bcrypt from "bcrypt";

import { db } from "@/server/db";
import { User } from "@prisma/client";
import createSampleBoardData from "@/services/boards/helpers/createSampleBoard";
import sendVerificationEmail from "@/services/auth/sendVerificationEmail";
import { loginCredentialSchema, registerCredentialSchema } from "./schemas";

interface CredentialType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isRegistration?: boolean;
}

const SAMPLE_BOARD_NAME = "Getting Started";

const createNewUser = async ({
  firstName,
  lastName,
  email,
  password,
}: CredentialType) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hashSync(password, salt);
  const user = await db.user.create({
    data: {
      name: `${firstName} ${lastName}`.trim(),
      email,
      hash,
    },
  });

  const newBoard = await db.board.create({
    data: { name: SAMPLE_BOARD_NAME, userId: user.id },
  });
  await createSampleBoardData(newBoard.id, user.id);

  return user;
};

export default async function authorize(credentials: any) {
  if (!credentials) throw new Error("INVALID_CREDENTIALS");

  const {
    email,
    password,
    isRegistration = false,
  } = credentials as CredentialType;

  const validation = isRegistration
    ? registerCredentialSchema.safeParse(credentials)
    : loginCredentialSchema.safeParse(credentials);
  if (!validation.success) throw new Error(JSON.stringify(validation.error));

  let user = (await db.user.findUnique({ where: { email } })) as User;

  if (!user) {
    if (isRegistration) {
      user = await createNewUser(credentials);
      await sendVerificationEmail({ user, forceSend: true });
    } else throw new Error("INVALID_CREDENTIALS");
  }

  const passwordValid = await bcrypt.compare(password, user.hash || "");
  if (!passwordValid) throw new Error("INVALID_CREDENTIALS");

  return user;
}
