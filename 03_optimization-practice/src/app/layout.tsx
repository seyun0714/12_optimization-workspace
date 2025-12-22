import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ⚠️ SEO 최적화 안됨: 메타데이터가 너무 단순함
export const metadata: Metadata = {
  title: "맛있는 레시피",
  description: "레시피 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* ⚠️ 폰트 최적화 안됨: 외부 CDN에서 폰트 로드 - 렌더링 블로킹 발생 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&family=Playfair+Display:wght@400;700;900&family=Roboto+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
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

