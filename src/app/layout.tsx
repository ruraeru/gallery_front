import { Metadata } from "next";
import { Suspense } from "react";
import localFont from 'next/font/local';
import "@/styles/globals.css";

const pretendard = localFont({
  src: "../fonts/Pretendard-Regular.ttf",
  display: "swap",
  weight: "400",
  style: "normal",
  variable: "--font-pretendard"
})

export const metadata: Metadata = {
  title: "모두의 갤러리: 당신의 추억을 공유해요!",
  description: "당신의 사진을 모두에게 공유해보세요!!",
  verification: {
    google: "nb6y67ccG_TyILDwpti6fskbLiuq52SWk_MsfzN9nTw",
  },
  category: "Technology",
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
    <html lang="ko" className={`${pretendard.variable} ${pretendard.className}`}>
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}