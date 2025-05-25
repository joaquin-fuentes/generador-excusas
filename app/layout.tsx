import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Excusas 2.0",
  description: "Web para generar excusas, épico",
  icons: {
    icon: "/logoExcusas.png",
  },
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
