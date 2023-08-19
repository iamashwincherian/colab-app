"use client";

import useUser from "../../utils/useUser";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast/use-toast";

const Avatar = ({ name }: { name?: string | null }) => {
  if (!name || name === "") return <></>;

  const firstLetter = name.charAt(0);
  let lastLetter = name.charAt(1);
  if (name.split(" ").length > 1) {
    lastLetter = name.split(" ").slice(-1)[0].charAt(0);
  }
  const avatarLetters = firstLetter + lastLetter;

  return (
    <div className="rounded-full bg-secondary p-2 border border-gray-200">
      <span className="tracking-wider">{avatarLetters}</span>
    </div>
  );
};

export function UserNav() {
  const router = useRouter();
  const { toast } = useToast();
  const user = useUser();
  if (!user) return <></>;

  const { name = undefined } = user;

  const handleLogout = () => {
    signOut({ redirect: false });
    toast({
      description: "Logging you out",
    });
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar name={name} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
