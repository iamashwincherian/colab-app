import Sidebar from "../components/Sidebar/Sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <div>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
