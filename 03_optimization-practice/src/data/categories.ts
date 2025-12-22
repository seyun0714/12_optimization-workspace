import { CategoryInfo, RecipeCategory } from '@/types/recipe';

export const categories: Record<RecipeCategory, CategoryInfo> = {
  '한식': {
    name: '한식',
    description: '전통 한국 음식 레시피',
    icon: '🍚'
  },
  '중식': {
    name: '중식',
    description: '중국 음식 레시피',
    icon: '🥢'
  },
  '양식': {
    name: '양식',
    description: '서양 음식 레시피',
    icon: '🍝'
  },
  '일식': {
    name: '일식',
    description: '일본 음식 레시피',
    icon: '🍣'
  },
  '베이킹': {
    name: '베이킹',
    description: '빵과 케이크 레시피',
    icon: '🥐'
  },
  '디저트': {
    name: '디저트',
    description: '달콤한 디저트 레시피',
    icon: '🍰'
  },
  '음료': {
    name: '음료',
    description: '음료와 주스 레시피',
    icon: '🥤'
  },
  '간식': {
    name: '간식',
    description: '간단한 간식 레시피',
    icon: '🍿'
  }
};

