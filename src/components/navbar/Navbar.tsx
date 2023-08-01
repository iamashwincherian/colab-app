import Logo from "../logo/logo";
import { UserNav } from "./UserNav";

export default function Navbar() {
  return (
    <div className="w-screen bg-white h-14 px-4 flex justify-between items-center dark:bg-dark-2 shadow">
      <Logo />
      <UserNav />
    </div>
  );
}
