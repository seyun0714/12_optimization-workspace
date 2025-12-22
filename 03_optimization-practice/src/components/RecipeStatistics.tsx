'use client';

import { useMemo } from 'react';
import { Recipe } from '@/types/recipe';

interface RecipeStatisticsProps {
  recipe: Recipe;
}

// ⚠️ 번들 최적화 안됨: 동적 import 없이 일반 import로 사용됨
export default function RecipeStatistics({ recipe }: RecipeStatisticsProps) {
  
  const statistics = useMemo(() => {
    const totalIngredients = recipe.ingredients.length;
    const totalSteps = recipe.steps.length;
    const avgStepsPerIngredient = (totalSteps / totalIngredients).toFixed(1);
    
    const ingredientCategories = {
      채소: recipe.ingredients.filter(ing => 
        ing.includes('양파') || ing.includes('마늘') || ing.includes('대파') || ing.includes('호박')
      ).length,
      육류: recipe.ingredients.filter(ing => 
        ing.includes('소고기') || ing.includes('돼지고기') || ing.includes('닭고기')
      ).length,
      조미료: recipe.ingredients.filter(ing => 
        ing.includes('소금') || ing.includes('후추') || ing.includes('간장') || ing.includes('설탕')
      ).length,
    };

    return {
      totalIngredients,
      totalSteps,
      avgStepsPerIngredient,
      ingredientCategories,
    };
  }, [recipe]);

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
      <h3 className="font-display text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        📊 레시피 통계
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {statistics.totalIngredients}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">재료 개수</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {statistics.totalSteps}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">조리 단계</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {statistics.avgStepsPerIngredient}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">단계/재료</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {recipe.rating}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">평점</div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">재료 카테고리별 분포</h4>
        <div className="space-y-2">
          {Object.entries(statistics.ingredientCategories).map(([category, count]) => (
            count > 0 && (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(count / statistics.totalIngredients) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-8">
                    {count}
                  </span>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

