import { recipes } from "@/data/recipes";
import { categories } from "@/data/categories";
import { notFound } from "next/navigation";
import Link from "next/link";
// ⚠️ 번들 최적화 안됨: 동적 import 없이 일반 import로 사용
import RelatedRecipes from "@/components/RelatedRecipes";
import ShowStatisticsButton from "@/components/ShowStatisticsButton";

import { formatRecipeDate } from "@/utils/date";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

// ⚠️ SEO 최적화 안됨: 동적 메타데이터 없음
// ⚠️ SEO 최적화 안됨: generateStaticParams 없음 (SSG 미사용)

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    notFound();
  }

  const categoryInfo = categories[recipe.category];

  // ⚠️ SEO 최적화 안됨: 구조화 데이터 (JSON-LD) 없음

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* ⚠️ SEO 최적화 안됨: article 태그 미사용, 일반 div 사용 */}
      
      {/* Breadcrumb - 시맨틱 태그 부족 */}
      <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:underline">
            홈
          </Link>
          <span>/</span>
          <Link href="/recipes" className="hover:underline">
            레시피
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${encodeURIComponent(recipe.category)}`}
            className="hover:underline"
          >
            {recipe.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">{recipe.title}</span>
        </div>
      </div>

      {/* Header */}
      {/* ⚠️ SEO 최적화 안됨: header 태그 미사용 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/categories/${encodeURIComponent(recipe.category)}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            <span>{categoryInfo.icon}</span>
            {recipe.category}
          </Link>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
            {recipe.difficulty}
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {recipe.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {recipe.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>⏱</span>
            <span>{recipe.cookingTime}분</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👥</span>
            <span>{recipe.servings}인분</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>{recipe.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👁</span>
            <span>{recipe.views.toLocaleString()}회</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{formatRecipeDate(recipe.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* ⚠️ 이미지 최적화 안됨: 일반 img 태그 사용, priority 없음, sizes 없음 */}
      <div className="w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Ingredients */}
      <div className="mb-8">
        {/* ⚠️ SEO 최적화 안됨: section 태그 미사용 */}
        <h2 className="font-display text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          재료 ({recipe.servings}인분)
        </h2>
        <ul className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          조리 방법
        </h2>
        <ol className="space-y-6">
          {recipe.steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Tips */}
      {recipe.tips && (
        <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg">
          <h2 className="font-display text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            💡 요리 팁
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{recipe.tips}</p>
        </div>
      )}

      {/* ⚠️ 번들 최적화 안됨: 일반 import로 사용 (동적 import 없음) */}
      <ShowStatisticsButton recipe={recipe} />

      {/* ⚠️ 번들 최적화 안됨: 일반 import로 사용 (동적 import 없음) */}
      <RelatedRecipes 
        currentRecipeId={recipe.id} 
        category={recipe.category}
        allRecipes={recipes}
      />

      {/* Back to List */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 전체 레시피로 돌아가기
        </Link>
      </div>
    </div>
  );
}

