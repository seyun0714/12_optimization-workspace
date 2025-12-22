import Link from "next/link";
import { categories } from "@/data/categories";
import { recipes } from "@/data/recipes";

// ⚠️ SEO 최적화 안됨: 메타데이터 없음

export default function CategoriesPage() {

  const categoryList = Object.values(categories).map((category) => {
    const count = recipes.filter((r) => r.category === category.name).length;
    return { ...category, count };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ⚠️ SEO 최적화 안됨: header 태그 미사용 */}
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          카테고리
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          원하는 카테고리를 선택하여 레시피를 탐색해보세요
        </p>
      </div>

      {/* ⚠️ SEO 최적화 안됨: section 태그 미사용 */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryList.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${encodeURIComponent(category.name)}`}
              className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105"
              >
              <div className="text-5xl mb-4 text-center">{category.icon}</div>
              <h2 className="font-display text-2xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
                {category.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                {category.description}
              </p>
              <div className="text-center text-blue-600 dark:text-blue-400 font-semibold">
                {category.count}개 레시피
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

