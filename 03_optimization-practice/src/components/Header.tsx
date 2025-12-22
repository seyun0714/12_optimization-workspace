import Link from "next/link";

export default function Header() {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      {/* ⚠️ SEO 최적화 안됨: header, nav 태그 미사용 */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="font-display text-xl font-bold text-gray-900 dark:text-gray-100">
              맛있는 레시피
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              홈
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              카테고리
            </Link>
            <Link 
              href="/recipes" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              전체 레시피
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              소개
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

