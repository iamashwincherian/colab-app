import Logo from "../logo/logo";
import { ThemeSwitcher } from "../themeSwitcher/ThemeSwitcher";
import { UserNav } from "./UserNav";

export default function Navbar() {
  return (
    <div className="w-screen bg-white h-14 px-4 flex justify-between items-center dark:bg-zinc-950 border-b ">
      <Logo />
      <div className="flex justify-center items-center gap-4">
        <ThemeSwitcher />
        <UserNav />
      </div>
    </div>
  );
}
