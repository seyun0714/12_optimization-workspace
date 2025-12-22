// ⚠️ 번들 최적화 안됨: 전체 라이브러리 import - 트리 쉐이킹 불가능
import * as dateFns from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 지정된 형식으로 포맷팅합니다.
 */
export function formatDate(date: Date | string, formatStr: string = 'yyyy년 MM월 dd일'): string {
  const dateObj = typeof date === 'string' ? dateFns.parseISO(date) : date;
  return dateFns.format(dateObj, formatStr, { locale: ko });
}

/**
 * 날짜로부터 경과 시간을 한국어로 표시합니다.
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? dateFns.parseISO(date) : date;
  return dateFns.formatDistanceToNow(dateObj, { addSuffix: true, locale: ko });
}

/**
 * 레시피 생성일을 포맷팅합니다.
 */
export function formatRecipeDate(dateString: string): string {
  return formatDate(dateString, 'yyyy년 MM월 dd일');
}

