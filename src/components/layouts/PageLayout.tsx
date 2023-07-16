import Sidebar from "../sidebar/Sidebar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white dark:bg-dark transition-colors">
      <Sidebar />
      {children}
    </div>
  );
}
