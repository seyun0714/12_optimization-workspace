import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";

// ⚠️ SEO 최적화 안됨: 메타데이터 없음

export default function RecipesPage() {

  const sortedRecipes = [...recipes].sort((a, b) => b.views - a.views);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ⚠️ SEO 최적화 안됨: header 태그 미사용 */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          전체 레시피
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          총 {recipes.length}개의 레시피를 만나보세요
        </p>
      </div>

      {/* ⚠️ SEO 최적화 안됨: section 태그 미사용 */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

