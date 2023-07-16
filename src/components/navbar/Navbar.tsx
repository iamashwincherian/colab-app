import ThemeSwitcher from "../../app/boards/components/ThemeSwitcher";
import Logo from "../logo/logo";

export default function Navbar() {
  return (
    <div className="w-screen bg-white h-14 px-4 flex justify-between items-center dark:bg-dark-2 shadow">
      <Logo />
      <ThemeSwitcher />
    </div>
  );
}
