# SEO 최적화 실습 프로젝트

## 📋 프로젝트 소개

이 프로젝트는 SEO를 학습하기 위한 실습 자료입니다.
의도적으로 최적화되지 않은 코드를 포함하고 있으며, 직접 문제점을 발견하고 개선하는 과정을 통해 검색 엔진 최적화를 학습할 수 있습니다.

## 🗂️ 프로젝트 구조

```
03_search-engine-optimization/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   ├── page.tsx             # 홈 페이지 
│   │   ├── about/
│   │   │   └── page.tsx         # 소개 페이지
│   │   └── blog/
│   │       ├── page.tsx         # 블로그 목록
│   │       └── [id]/
│   │           └── page.tsx     # 블로그 상세 
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx       # 헤더 
│   │       └── Footer.tsx       # 푸터
│   ├── post.service.ts          # 블로그 포스트 더미 데이터
│   └── post.type.ts             # 블로그 포스트 타입 정의
├── public/
│   └── images/                  # 더미 이미지 파일들
├── package.json
├── next.config.ts
└── README.md
```

## 🚨 현재 프로젝트의 SEO 문제점

### 1. **메타데이터 문제**

#### `src/app/layout.tsx`
- ❌ **title이 너무 짧고 구체적이지 않음**: "블로그"만 사용
- ❌ **meta description 완전 누락**: 검색 결과에 표시될 설명이 없음
- ❌ **Open Graph 태그 없음**: 소셜 미디어 공유 시 미리보기 없음
- ❌ **metadataBase 설정 없음**: 절대 URL 생성 불가
- ❌ **언어 속성 문제**: `lang="en"`이지만 한글 콘텐츠

```typescript
// 현재 (잘못된 예시)
export const metadata: Metadata = {
  title: "블로그",
};
```

#### `src/app/blog/[id]/page.tsx`
- ❌ **동적 메타데이터 없음**: 모든 블로그 포스트가 같은 title/description
- ❌ **generateStaticParams 없음**: 동적 라우트 정적 생성 안 됨 (SSR만 사용)
- ❌ **JSON-LD 구조화 데이터 없음**: 검색 엔진이 콘텐츠 이해 어려움

### 2. **시맨틱 HTML 문제**

#### 모든 페이지 공통
- ❌ **`<main>` 태그 없음**: `<div>`로 대체
- ❌ **`<article>` 태그 없음**: 블로그 포스트를 `<div>`로 표현
- ❌ **`<section>` 태그 부재**: 콘텐츠 섹션을 의미 없는 `<div>`로 구성
- ❌ **제목 태그 남용**: `<h1>`을 여러 개 사용하거나, 제목을 `<div>`로 스타일링만

```tsx
// 현재 (잘못된 예시)
<div className="max-w-6xl mx-auto">  {/* main 대신 div */}
  <div className="text-5xl font-bold"> {/* h1 대신 div */}
    개발자를 위한 기술 블로그
  </div>
</div>
```

#### `src/components/layout/Header.tsx`
- ❌ **`<header>` 태그 대신 `<div>` 사용**
- ❌ **`<nav>` 태그 없음**: 네비게이션을 `<div>`로 구성
- ❌ **로고에 `<h1>` 사용**: 페이지 제목에 사용해야 할 `<h1>`을 로고에 낭비

#### `src/app/page.tsx`
- ❌ **`<h1>` 태그 없음**: 가장 중요한 페이지 제목이 `<div>`
- ❌ **블로그 카드가 `<div>`**: `<article>` 태그 사용해야 함

#### `src/app/blog/[id]/page.tsx`
- ❌ **`<h1>` 중복**: 같은 페이지에 2개의 `<h1>` 태그
- ❌ **콘텐츠 영역이 `<div>`**: 실제 콘텐츠는 의미 있는 태그로 감싸야 함

### 3. **네비게이션 및 링크 문제**

#### 모든 페이지 공통
- ❌ **`<Link>` 대신 `<button>` + `router.push()` 사용**
  - 검색 엔진 크롤러가 링크를 따라갈 수 없음
  - 우클릭으로 새 탭에서 열기 불가
  - 페이지 미리 로드(prefetch) 안 됨

```tsx
// 현재 (잘못된 예시)
<button onClick={() => router.push("/blog")}>
  블로그
</button>

// 올바른 방법
<Link href="/blog">블로그</Link>
```

### 4. **이미지 최적화 문제**

#### `src/app/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[id]/page.tsx`
- ❌ **`<img>` 태그 사용**: Next.js `Image` 컴포넌트 미사용
- ❌ **alt 속성 완전 누락**: 스크린 리더 및 SEO에 치명적
- ❌ **width/height 속성 없음**: CLS(Cumulative Layout Shift) 문제 발생

```tsx
// 현재 (잘못된 예시)
<img src={post.imageUrl} className="object-cover" />

// 올바른 방법
<Image 
  src={post.imageUrl} 
  alt={post.title}
  width={800}
  height={400}
/>
```

### 5. **Client Component 과다 사용**

- ❌ **모든 페이지가 "use client"**: SSR/SSG 혜택 못 받음
- ❌ **초기 HTML에 콘텐츠 없음**: 검색 엔진이 크롤링하기 어려움
- ❌ **SEO에 불리**: JavaScript 실행 후에야 콘텐츠 표시

### 6. **구조화 데이터 부재**

- ❌ **JSON-LD 없음**: 검색 엔진이 콘텐츠 유형을 이해 못함
- ❌ **breadcrumb 없음**: 페이지 계층 구조를 알 수 없음
- ❌ **Article schema 없음**: 블로그 포스트가 일반 페이지로 인식

### 7. **기타 SEO 문제**

- ❌ **robots.txt 없음**: 크롤링 규칙 정의 안 됨
- ❌ **sitemap.xml 없음**: 모든 페이지 URL 제공 안 됨
- ❌ **canonical URL 없음**: 중복 콘텐츠 문제 가능성

## 📊 SEO 측정 방법

### 1. **개발자 도구로 직접 확인**

#### 메타 태그 확인
```bash
# Chrome DevTools → Elements → <head> 섹션 확인
```

#### HTML 구조 검증
```bash
# 시맨틱 태그 사용 확인
# - <header>, <main>, <nav>, <article>, <section>, <footer>
# - <h1>이 페이지당 1개만 있는지
# - 제목 태그 계층 구조 (h1 → h2 → h3)
```

#### 링크 크롤링 가능성 확인
```bash
# Elements 탭에서 네비게이션 확인
# <a href="..."> 태그로 되어 있는지
# <button onclick="...">으로 되어 있지 않은지
```

### 2. **Lighthouse** (로컬 개발 환경)

Chrome DevTools에 내장된 자동화 도구입니다.

#### 실행 방법
```bash
# 1. 개발 서버 실행
npm run dev

# 2. Chrome 브라우저에서 http://localhost:3000 접속
# 3. F12 → Lighthouse 탭
# 4. Categories: SEO 체크
# 5. "Analyze page load" 클릭
```

#### 주요 SEO 체크 항목
- ✅ Document has a `<title>` element
- ✅ Document has a meta description
- ✅ Page has successful HTTP status code
- ✅ Links are crawlable
- ✅ `<html>` element has a `[lang]` attribute
- ✅ Images have `alt` attributes
- ✅ Document uses legible font sizes
- ✅ robots.txt is valid

### 3. **구조화 데이터 테스트**

#### Google Rich Results Test
1. [Rich Results Test](https://search.google.com/test/rich-results) 접속
2. URL 입력 또는 코드 직접 입력
3. Article, Breadcrumb 등 구조화 데이터 확인

### 4. **Open Graph 미리보기**

#### 소셜 미디어 디버거
- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter/X**: [Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [Post Inspector](https://www.linkedin.com/post-inspector/)

페이지 URL을 입력하여 OG 태그가 제대로 설정되었는지 확인

### 5. **Google Search Console** (프로덕션 배포 후)

가장 정확한 SEO 측정 도구입니다.

#### 설정 방법
1. 사이트를 배포 (Vercel, Netlify 등)
2. [Google Search Console](https://search.google.com/search-console) 접속
3. 속성 추가 → 도메인 또는 URL 입력
4. 소유권 확인 (HTML 파일 업로드 or DNS 레코드)

#### 확인 항목
- **URL 검사**: 특정 페이지가 색인되었는지 확인
- **커버리지**: 색인된 페이지 수, 색인 오류
- **실적**: 검색어별 노출/클릭 수
- **코어 웹 바이탈**: LCP, FID, CLS 점수
- **모바일 사용성**: 모바일 친화성 문제


