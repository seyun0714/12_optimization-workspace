import type { Metadata } from 'next';
import { Noto_Sans_KR, Playfair_Display, Roboto_Mono } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: '이미지 & 폰트 최적화',
  description: '최적화를 통해 성능을 개선하세요.',
};

/*
  최적화: next/font/google로 Google Fonts 최적화
  - 빌드 시점에 폰트 다운로드 => 정적 assets (런타임 네트워크 요청 없음)
  => Self-Hosting
  - FOIT (폰트 적용 전 아예 보여지지 않음)/FOUT (폰트가 보이지만 스타일이 적용되지 않음) 문제 방지
*/

// Noto Sans KR 구글 폰트 객체 생성
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'], // 웹 폰트 서브셋(글꼴에 포함할 문자 집합) 지정
  weight: ['400', '700'], // 폰트 굵기
  display: 'swap', // FOUT(시스템 폰트 -> 커스텀 폰트로 자연스러운 전환) 방지 + 성능 개선
  variable: '--font-noto-sans', // CSS에서 참조하기 위한 변수명
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-playfair',
});
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
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
        className={`${notoSansKR} ${robotoMono} ${playfairDisplay} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
