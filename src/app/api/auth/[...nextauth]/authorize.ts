import bcrypt from "bcrypt";
import { db } from "@server/db";
import { User } from "@prisma/client";

interface CredentialType {
  name: string;
  email: string;
  password: string;
  isRegistration?: boolean;
}

const createNewUser = async ({ name, email, password }: CredentialType) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hashSync(password, salt);
  return db.user.create({
    data: {
      name,
      email,
      hash,
    },
  });
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
