import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Universal Digital Services Tracker",
  description:
    "By 2035, every person on earth should have access to 15 essential digital public services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
