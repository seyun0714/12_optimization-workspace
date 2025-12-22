import Link from "next/link";
import { Recipe } from "@/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {/* ⚠️ SEO 최적화 안됨: article 태그 미사용 */}
      {/* ⚠️ 이미지 최적화 안됨: 일반 img 태그 사용 */}
      <Link href={`/recipes/${recipe.id}`} className="block">
        <div className="w-full h-48">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {recipe.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ⏱ {recipe.cookingTime}분
            </span>
          </div>
          
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
            {recipe.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {recipe.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              👥 {recipe.servings}인분
            </span>
            <span className="text-yellow-500">
              ⭐ {recipe.rating}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

