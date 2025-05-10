import { Metadata } from "next";
import { Suspense } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Gallery App",
  description: "A modern gallery application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}