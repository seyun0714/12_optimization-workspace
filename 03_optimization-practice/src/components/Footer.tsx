export default function Footer() {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 mt-auto">
      {/* ⚠️ SEO 최적화 안됨: footer 태그 미사용 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              맛있는 레시피
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              쉽고 간단한 레시피로 누구나 요리 마스터가 될 수 있습니다.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">카테고리</h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>한식</div>
              <div>양식</div>
              <div>일식</div>
              <div>베이킹</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">정보</h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div>연락처: contact@recipes.com</div>
              <div>© 2024 맛있는 레시피</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

