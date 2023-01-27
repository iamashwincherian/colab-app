"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const CALLBACK_URL = "/?auth=success";

const ButtonVarientTexts = {
  login: "Login with Google",
  signup: "Signup with Google",
};

type ButtonVarient = "login" | "signup";
interface ButtonProps {
  id: string;
  type: ButtonVarient;
}

export default function GoogleButton({ type, id }: ButtonProps) {
  const getText = (type: ButtonVarient) => ButtonVarientTexts[type];

  return (
    <button
      onClick={() => signIn(id, { callbackUrl: CALLBACK_URL })}
      type={"button"}
      className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center hover:cursor-pointer dark:border-gray-700 border-slate-200 rounded-lg dark:text-gray-300 hover:shadow dark:hover:bg-dark text-slate-700 hover:text-slate-900 transition-colors"
    >
      <Image
        src="https://www.svgrepo.com/show/355037/google.svg"
        className="w-5 h-5"
        width={18}
        height={18}
        alt=""
      />
      <span className="text-sm">{getText(type)}</span>
    </button>
  );
}
