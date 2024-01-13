import Navbar from "../navbar/Navbar";

export default function FullScreenLayout({
  children,
  nav = false,
}: {
  children?: React.ReactNode;
  nav?: boolean;
}) {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-zinc-950 h-screen">
      {nav && <Navbar />}
      {children}
    </div>
  );
}
