import type { Metadata } from "next";
//import { formular } from "./fonts";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Meet Black",
  description: "a landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
