import { Metadata } from "next";
import GlobalStyles from '@/components/GlobalStyles';
import { Suspense } from 'react';

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
        <Suspense>
          <GlobalStyles />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
