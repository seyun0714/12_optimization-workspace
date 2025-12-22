'use client';

import { useState } from 'react';
import RecipeStatistics from '@/components/RecipeStatistics';
import { Recipe } from '@/types/recipe';

interface ShowStatisticsButtonProps {
  recipe: Recipe;
}

// ⚠️ 번들 최적화 안됨: RecipeStatistics를 일반 import로 사용 (동적 import 없음)
export default function ShowStatisticsButton({ recipe }: ShowStatisticsButtonProps) {
  const [showStatistics, setShowStatistics] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowStatistics(!showStatistics)}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg"
      >
        {showStatistics ? '📊 통계 숨기기' : '📊 통계 보기'}
      </button>
      
      {showStatistics && <RecipeStatistics recipe={recipe} />}
    </>
  );
}

