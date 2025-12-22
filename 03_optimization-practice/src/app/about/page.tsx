// ⚠️ SEO 최적화 안됨: 메타데이터 없음

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* ⚠️ SEO 최적화 안됨: article, header, section 태그 미사용 */}
      
      <div className="mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          맛있는 레시피 소개
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          쉽고 맛있는 요리를 함께 만들어요
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <div>
          <h2 className="font-display text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            우리의 목표
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            맛있는 레시피는 누구나 쉽게 요리를 배울 수 있도록 도와주는 플랫폼입니다. 
            복잡하고 어려운 레시피가 아닌, 초보자도 따라할 수 있는 간단하고 명확한 레시피를 제공합니다.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            주요 특징
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl mt-1">✓</span>
              <div>
                <strong className="font-semibold">단계별 상세 설명</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  각 레시피는 초보자도 따라할 수 있도록 단계별로 상세하게 설명되어 있습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl mt-1">✓</span>
              <div>
                <strong className="font-semibold">다양한 카테고리</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  한식, 양식, 일식, 베이킹 등 다양한 카테고리의 레시피를 제공합니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl mt-1">✓</span>
              <div>
                <strong className="font-semibold">요리 팁 제공</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  각 레시피마다 전문가의 요리 팁을 제공하여 더 맛있는 요리를 만들 수 있습니다.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 dark:text-blue-400 text-xl mt-1">✓</span>
              <div>
                <strong className="font-semibold">실용적인 정보</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  조리 시간, 인분 수, 난이도 등 실용적인 정보를 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            연락처
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            문의사항이 있으시면 언제든지 연락주세요.
            <br />
            이메일: contact@recipes.com
          </p>
        </div>
      </div>
    </div>
  );
}

