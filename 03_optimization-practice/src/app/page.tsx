import Link from "next/link";
import { recipes } from "@/data/recipes";
import { categories } from "@/data/categories";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  const popularRecipes = [...recipes]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  const recentRecipes = [...recipes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const categoryCounts = Object.keys(categories).map((category) => {
    const count = recipes.filter((r) => r.category === category).length;
    return { category, count, ...categories[category as keyof typeof categories] };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ⚠️ SEO 최적화 안됨: section 태그 미사용, 일반 div만 사용 */}
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          맛있는 레시피
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          쉬운 레시피로 요리 실력을 쑥쑥 키워보세요
        </p>
        
        {/* ⚠️ 이미지 최적화 안됨: 일반 img 태그 사용, priority 없음 */}
        <div className="w-full max-w-4xl mx-auto h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&h=600&fit=crop"
            alt="요리 키친"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 카테고리 섹션 */}
      <div className="mb-16">
        <h2 className="font-display text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          카테고리별 탐색
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categoryCounts.map(({ name, icon, description, count }) => (
            <Link
              key={name}
              href={`/categories/${encodeURIComponent(name)}`}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
            >
              <div className="text-4xl mb-2">{icon}</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">{name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {count}개 레시피
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 인기 레시피 섹션 */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-gray-100">
            인기 레시피
          </h2>
          <Link
            href="/recipes"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      {/* 최신 레시피 섹션 */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-gray-100">
            최신 레시피
          </h2>
          <Link
            href="/recipes"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

