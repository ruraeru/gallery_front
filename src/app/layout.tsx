import { Metadata } from "next";
import { Suspense } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "모아통: 당신의 추억을 공유해요!",
  description: "당신의 사진을 모두에게 공유해보세요!!",
  icons: {
    icon: "/mainfavicon.svg"
  }
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