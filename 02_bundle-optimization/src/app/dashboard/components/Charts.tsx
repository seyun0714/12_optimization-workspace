"use client";

import { useState } from "react";

// ❌ 문제점 1: lodash 전체를 import (트리쉐이킹 X)
import _ from "lodash";

// ❌ 문제점 2: 무거운 moment 라이브러리 사용
import moment from "moment";
import "moment/locale/ko";

// ❌ 문제점 3: Chart.js와 react-chartjs-2(Chart.js 래핑 라이브러리)를 직접 import (코드 스플리팅 X)
// Chart.js는 약 150KB의 무거운 시각화 라이브러리입니다.
// 직접 import시 해당 페이지를 방문하지 않아도 전체 번들에 포함되어 초기 로딩 속도가 저하될 수 있습니다.
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

// Chart.js가 그려지기 위해 필요한 컴포넌트들을 등록
ChartJS.register(
  Title,          // 제목 (차트 제목)
  Tooltip,        // 툴팁 (차트 툴팁)
  Legend,         // 범례 (차트 범례)
  CategoryScale,  // 카테고리 축
  LinearScale,    // 선형 축
  LineElement,    // 선 요소 (Line 차트)
  PointElement,   // 점 요소 (Line 차트)
  BarElement,     // 바 요소 (Bar 차트)
  ArcElement,     // 원 요소 (Pie 차트)
);

export default function Charts({ salesData }: { 
  salesData: { 
    month: string, 
    sales: number, 
    profit: number, 
    expenses: number 
  }[] 
}) {

  const [selectedChart, setSelectedChart] = useState<"line" | "bar" | "pie">("line");

  // Line 차트 데이터
  const lineChartData = {
    labels: salesData.map((d) => d.month),
    datasets: [
      {
        label: "매출",
        data: salesData.map((d) => d.sales),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "순이익",
        data: salesData.map((d) => d.profit),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  // Bar 차트 데이터
  const barChartData = {
    labels: salesData.map((d) => d.month),
    datasets: [
      {
        label: "지출",
        data: salesData.map((d) => d.expenses),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Pie 차트 데이터
  const pieChartData = {
    labels: ["매출", "순이익", "지출"],
    datasets: [
      {
        data: [
          _.sumBy(salesData, "sales"),
          _.sumBy(salesData, "profit"),
          _.sumBy(salesData, "expenses"),
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // 차트 옵션
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${moment().format("YYYY년")} 실적 현황`,
      },
    },
  };

  return (
    <>
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setSelectedChart("line")}
          className={`px-4 py-2 rounded ${
            selectedChart === "line"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          라인 차트
        </button>
        <button
          onClick={() => setSelectedChart("bar")}
          className={`px-4 py-2 rounded ${
            selectedChart === "bar"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          바 차트
        </button>
        <button
          onClick={() => setSelectedChart("pie")}
          className={`px-4 py-2 rounded ${
            selectedChart === "pie"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          파이 차트
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-96">
          {selectedChart === "line" && (
            <Line data={lineChartData} options={chartOptions} />
          )}
          {selectedChart === "bar" && (
            <Bar data={barChartData} options={chartOptions} />
          )}
          {selectedChart === "pie" && (
            <Pie data={pieChartData} options={chartOptions} />
          )}
        </div>
      </div>
    </>
  );
}