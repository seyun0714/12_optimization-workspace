import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  /* config options here */
};

// npm run build => 번들 분석기 활성화 x : 일반적인 빌드
// npm run analyze => 번들 분석기 활성화 o + 빌드 (ANALYZE 환경변수 true를 부여하면서 빌드)
// 번들 분석기 설정 - 번들 분석기 래핑 객체 생성
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // 빌드 시 ANALYZE 환경변수가 true일 경우 번들 분석기 활성화
  openAnalyzer: true, // 번들 분석기 활성화 된 채로 빌드 완료 => 분석 결과 페이지를 브라우저로 자동 열기
});

export default bundleAnalyzer(nextConfig);
