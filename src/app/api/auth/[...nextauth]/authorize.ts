import bcrypt from "bcrypt";
import { db } from "@/server/db";
import { User } from "@prisma/client";
import createSampleBoardData from "@/services/boards/helpers/createSampleBoard";
import sendVerificationEmail from "@/services/auth/sendVerificationEmail";

interface CredentialType {
  name: string;
  email: string;
  password: string;
  isRegistration?: boolean;
}

const SAMPLE_BOARD_NAME = "Getting Started";

const createNewUser = async ({ name, email, password }: CredentialType) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hashSync(password, salt);
  const user = await db.user.create({
    data: {
      name,
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

  let user: User | null = await db.user.findUnique({ where: { email } });

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
