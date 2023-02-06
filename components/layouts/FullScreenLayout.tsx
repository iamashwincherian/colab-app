export default function FullScreenLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <div className="flex bg-gray-50 dark:bg-dark">{children}</div>;
}
