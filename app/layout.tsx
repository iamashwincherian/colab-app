import "../styles/globals.css";
import Body from "./Body";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <Body>{children}</Body>
    </html>
  );
}
