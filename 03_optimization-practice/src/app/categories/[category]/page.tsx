import { RecipeCategory } from "@/types/recipe";
import { categories } from "@/data/categories";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// ⚠️ SEO 최적화 안됨: 동적 메타데이터 없음, generateStaticParams 없음

export default async function CategoryPage({ params }: CategoryPageProps) {
  
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryInfo = categories[decodedCategory as RecipeCategory];

  const categoryRecipes = recipes.filter((r) => r.category === decodedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ⚠️ SEO 최적화 안됨: header 태그 미사용 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{categoryInfo.icon}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            {decodedCategory}
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {categoryInfo.description} · 총 {categoryRecipes.length}개의 레시피
        </p>
      </div>

      {categoryRecipes.length === 0 ? (
        // ⚠️ SEO 최적화 안됨: section 태그 미사용
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            아직 {decodedCategory} 카테고리의 레시피가 없습니다.
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

