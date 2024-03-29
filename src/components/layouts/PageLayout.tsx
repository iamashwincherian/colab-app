import Sidebar from "../sidebar/Sidebar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white dark:bg-zinc-950 transition-colors">
      <Sidebar />
      {children}
    </div>
  );
}
