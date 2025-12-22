'use client';

import { useState } from 'react';
import { Recipe } from '@/types/recipe';
import dynamic from 'next/dynamic';

const RecipeStatistics = dynamic(() => import('@/components/RecipeStatistics'));

interface ShowStatisticsButtonProps {
  recipe: Recipe;
}

export default function ShowStatisticsButton({
  recipe,
}: ShowStatisticsButtonProps) {
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
