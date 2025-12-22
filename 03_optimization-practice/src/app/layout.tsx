import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Noto_Sans_KR, Playfair_Display, Roboto_Mono } from 'next/font/google';

// ⚠️ SEO 최적화 안됨: 메타데이터가 너무 단순함
export const metadata: Metadata = {
  title: '맛있는 레시피',
  description: '레시피 모음',
};

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'optional',
  variable: '--font-noto-sans',
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'optional',
  variable: '--font-playfair',
});
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'optional',
  variable: '--font-roboto-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.variable} ${playfairDisplay.variable} ${robotoMono.variable} antialiased`}
      >
        <Header />
        {/* ⚠️ SEO 최적화 안됨: main 태그 대신 div 사용 */}
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
