'use client';

import Link from 'next/link';
import { useState } from 'react';

// ❌ 문제점 1: lodash 전체를 import (트리쉐이킹 X)
// import _ from "lodash";
import sumBy from 'lodash/sumBy';
import meanBy from 'lodash/meanBy';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import countBy from 'lodash/countBy';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import chunk from 'lodash/chunk';
import round from 'lodash/round';

// ❌ 문제점 2: 큰 데이터(1000개의 아이템)를 인라인으로 정의 (별도 파일로 분리해야 함)
// 실제 프로젝트에서는 이런 대용량 데이터를 별도 JSON 파일로 분리하거나 API를 통해 가져와야 합니다.
const products = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `상품 ${i + 1}`,
  category: ['전자기기', '의류', '식품', '도서', '생활용품'][i % 5],
  price: Math.floor(Math.random() * 1000000) + 10000,
  stock: Math.floor(Math.random() * 100),
  description:
    `이것은 상품 ${
      i + 1
    }의 상세 설명입니다. 매우 훌륭한 상품이며 고객 만족도가 높습니다. ` +
    `다양한 용도로 활용할 수 있으며, 품질이 우수합니다. 지금 바로 구매하세요!`,
  tags: ['인기', '신상', '할인', '베스트셀러', '추천상품'].filter(
    () => Math.random() > 0.5
  ),
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500),
  seller: `판매자${Math.floor(i / 10) + 1}`,
  createdAt: new Date(2024, 0, Math.floor(i / 30) + 1).toISOString(),
}));

const categories = {
  전자기기: {
    subcategories: ['스마트폰', '노트북', '태블릿', '이어폰', '스마트워치'],
    filters: ['가격대', '브랜드', '리뷰점수', '배송'],
    sortOptions: ['인기순', '가격낮은순', '가격높은순', '최신순'],
  },
  의류: {
    subcategories: ['상의', '하의', '아우터', '신발', '액세서리'],
    filters: ['사이즈', '색상', '브랜드', '가격대'],
    sortOptions: ['인기순', '판매량순', '가격순'],
  },
  식품: {
    subcategories: ['과일', '채소', '육류', '수산물', '가공식품'],
    filters: ['원산지', '유통기한', '가격대'],
    sortOptions: ['신선도순', '가격순', '인기순'],
  },
  도서: {
    subcategories: ['소설', '에세이', '자기계발', '경제경영', 'IT'],
    filters: ['저자', '출판사', '출간일', '베스트셀러'],
    sortOptions: ['인기순', '최신순', '평점순'],
  },
  생활용품: {
    subcategories: ['주방용품', '욕실용품', '청소용품', '수납용품'],
    filters: ['브랜드', '가격대', '용량'],
    sortOptions: ['판매량순', '가격순', '리뷰순'],
  },
};

export default function DataPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전자기기');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // ❌ 문제점 1과 연관: lodash를 사용한 데이터 처리

  // 통계 계산
  const stats = {
    totalItems: products.length,
    totalValue: sumBy(products, (item) => item.price * item.stock),
    avgPrice: meanBy(products, 'price'),
    maxPrice: maxBy(products, 'price')?.price,
    minPrice: minBy(products, 'price')?.price,
    categories: countBy(products, 'category'),
  };

  // 카테고리 선택 및 검색어 기반으로 필터링 되는 데이터
  const filteredData = filter(products, (item) => {
    const matchesCategory =
      selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 필터링된 데이터를 가격 내림차순으로 정렬시킨 데이터
  const sortedData = orderBy(filteredData, ['price'], ['desc']);
  // 필터링 + 정렬까지 완료된 데이터를 itemsPerPage(한페이지당 아이템 개수) 단위로 나누어 청크로 만든 데이터
  const paginatedData = chunk(sortedData, itemsPerPage);
  // 청크된 데이터 기반으로 현재 페이지에 뿌려줄 실질적인 데이터
  const currentPageData = paginatedData[currentPage - 1] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">데이터 페이지</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            홈으로
          </Link>
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                이 페이지의 문제점
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    1000개 아이템의 큰 배열을 인라인으로 정의 → 번들 크기 증가
                  </li>
                  <li>
                    복잡한 데이터 처리 로직, 컴포넌트들이 하나의 페이지
                    클라이언트 컴포넌트로 구현 → 번들 크기 증가
                  </li>
                  <li>lodash 전체를 import하여 데이터 처리</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">전체 상품</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalItems}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">평균 가격</div>
            <div className="text-2xl font-bold text-gray-900">
              {round(stats.avgPrice).toLocaleString()}원
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">최고가</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.maxPrice?.toLocaleString()}원
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500">최저가</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.minPrice?.toLocaleString()}원
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 md:col-span-2">
            <div className="text-sm text-gray-500">총 재고 가치</div>
            <div className="text-2xl font-bold text-gray-900">
              {round(stats.totalValue).toLocaleString()}원
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* 필터 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="전체">전체</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                검색
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="상품명 또는 설명으로 검색..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            {Object.entries(stats.categories).map(([cat, count]) => (
              <span
                key={cat}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {cat}: {count}개
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            상품 목록 ({filteredData.length}개)
          </h2>

          {/* 상품 목록 테이블 */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    상품명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    가격
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    재고
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    평점
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPageData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.price.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ⭐ {item.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from(
              { length: Math.min(paginatedData.length, 10) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
