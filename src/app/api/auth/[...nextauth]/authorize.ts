import bcrypt from "bcrypt";
import { db } from "@/server/db";
import { User } from "@prisma/client";
import createBoard from "@/services/boards/createBoard";

interface CredentialType {
  name: string;
  email: string;
  password: string;
  isRegistration?: boolean;
}

const SAMPLE_BOARD_NAME = "Getting Started";
const SAMPLE_LIST_NAME = "Sample List";
const SAMPLE_CARD_NAME = "Sample Card";

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

  await db.list.create({
    data: {
      name: SAMPLE_LIST_NAME,
      position: 0,
      boardId: newBoard.id,
      userId: user.id,
      cards: {
        create: {
          title: SAMPLE_CARD_NAME,
          boardId: newBoard.id,
          position: 0,
          userId: user.id,
        },
      },
    },
  });

  return user;
};

export default async function authorize(credentials: any) {
  if (!credentials) return null;
  const {
    email,
    password,
    isRegistration = false,
  } = credentials as CredentialType;

  let user: User | null = await db.user.findUnique({ where: { email } });

  if (!user) {
    if (isRegistration) {
      user = await createNewUser(credentials);
    } else return null;
  }

  const passwordValid = await bcrypt.compare(password, user.hash || "");
  if (!passwordValid) return null;

  return user;
}
