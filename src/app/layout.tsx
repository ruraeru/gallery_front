import RootStyleRegistry from '@/lib/emotion';
import { Metadata } from "next";
import GlobalStyles from '@/components/GlobalStyles';

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
        <RootStyleRegistry>
          <GlobalStyles />
          {children}
        </RootStyleRegistry>
      </body>
    </html>
  );
}
