import "../styles/globals.css";
import Body from "./Body";
import Head from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head />
      <Body>{children}</Body>
    </html>
  );
}
