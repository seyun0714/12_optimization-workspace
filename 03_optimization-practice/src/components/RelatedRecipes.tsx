'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Recipe } from '@/types/recipe';

interface RelatedRecipesProps {
  currentRecipeId: string;
  category: string;
  allRecipes: Recipe[];
}

// ⚠️ 번들 최적화 안됨: 동적 import 없이 일반 import로 사용됨
export default function RelatedRecipes({ currentRecipeId, category, allRecipes }: RelatedRecipesProps) {
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const related = allRecipes
      .filter(recipe => recipe.id !== currentRecipeId && recipe.category === category)
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
    
    setRelatedRecipes(related);
  }, [currentRecipeId, category, allRecipes]);

  if (relatedRecipes.length === 0) {
    return null;
  }

  return (
    // ⚠️ SEO 최적화 안됨: section 태그 미사용
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="font-display text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        관련 레시피
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedRecipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden block"
          >
            {/* ⚠️ 이미지 최적화 안됨: 일반 img 태그 사용 */}
            <div className="w-full h-40">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
                {recipe.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>⏱ {recipe.cookingTime}분</span>
                <span>⭐ {recipe.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

