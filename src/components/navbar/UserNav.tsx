"use client";

import useUser from "../../utils/useUser";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast/use-toast";
import openModal from "@/utils/openModal";
import ProfileModal from "./ProfileModal";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";

const UserAvatar = ({ name }: { name?: string | null }) => {
  if (!name || name === "") return <></>;

  const firstLetter = name.charAt(0);
  let lastLetter = name.charAt(1);
  if (name.split(" ").length > 1) {
    lastLetter = name.split(" ").slice(-1)[0].charAt(0);
  }
  return (
    <Avatar className="border w-9 h-9 cursor-pointer">
      <AvatarFallback>{`${firstLetter}${lastLetter}`}</AvatarFallback>
    </Avatar>
  );
};

export function UserNav() {
  const router = useRouter();
  const { toast } = useToast();
  const user = useUser();
  if (!user) return <></>;

  const { name = undefined } = user;

  const handleLogout = () => {
    signOut({ redirect: true });
    toast({
      description: "Logging you out",
    });
  };

  const openProfile = () => {
    openModal(<ProfileModal />);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatar name={name} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal" onClick={openProfile}>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <GearIcon className="mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <ExitIcon className="mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
