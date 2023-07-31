import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <div className="w-screen bg-white h-14 px-4 flex justify-between items-center dark:bg-dark-2 shadow">
      <Logo />
      <div className="flex gap-4">
        {/* <ThemeSwitcher /> */}
        <Button variant="outline" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
}
