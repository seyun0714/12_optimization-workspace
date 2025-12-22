export type RecipeCategory = 
  | '한식' 
  | '중식' 
  | '양식' 
  | '일식' 
  | '베이킹' 
  | '디저트' 
  | '음료' 
  | '간식';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  image: string;
  cookingTime: number; // 분 단위
  servings: number; // 인분
  difficulty: '쉬움' | '보통' | '어려움';
  ingredients: string[];
  steps: string[];
  tips?: string;
  createdAt: string;
  views: number;
  rating: number;
}

export interface CategoryInfo {
  name: RecipeCategory;
  description: string;
  icon: string;
}

