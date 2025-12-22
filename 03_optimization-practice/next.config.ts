import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80],
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // 빌드 시 ANALYZE 환경변수가 true일 경우 번들 분석기 활성화
  openAnalyzer: true, // 번들 분석기 활성화 된 채로 빌드 완료 => 분석 결과 페이지를 브라우저로 자동 열기
});

export default bundleAnalyzer(nextConfig);
