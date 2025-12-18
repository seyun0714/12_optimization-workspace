'use client';

import { useState } from 'react';
import Link from 'next/link';

// ❌ 문제점 1: lodash 전체를 import (트리쉐이킹 X)
// import _ from 'lodash' => 사용하는 함수만 import
import debounce from 'lodash/debounce';

// ❌ 문제점 2: 무거운 moment 라이브러리 사용
// import moment from 'moment';
// import 'moment/locale/ko'; => 경량화된 dayjs 사용
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import dynamic from 'next/dynamic';

// ❌ 문제점 3: 무거운 코드에디터 라이브러리를 직접 import (코드 스플리팅 X)
// Monaco Editor는 약 3MB 이상의 크기를 가진 매우 무거운 라이브러리입니다.
// 직접 import시 해당 페이지를 방문하지 않아도 전체 번들에 포함되어 초기 로딩 속도가 저하될 수 있습니다.
// import Editor from '@monaco-editor/react';
// lazy loading 적용
const Editor = dynamic(() => import('@monaco-editor/react'), {
  loading: () => (
    // 동적으로 로드될 때 표시될 로딩 UI
    <div className="h-100 flex items-center justify-center bg-zinc-950 text-white rounded-md">
      로딩 중...
    </div>
  ),
  ssr: false,
});

export default function EditorPage() {
  const [content, setContent] = useState('// 여기에 코드를 작성하세요...\n');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');

  // ❌ 문제점 1과 연관: lodash의 debounce 함수만 사용 (하지만 전체를 import 했음)
  const handleContentChange = debounce((value: string | undefined) => {
    if (value !== undefined) {
      setContent(value);
      console.log('Content updated:', value.length, 'characters');
    }
  }, 300);

  // ❌ 문제점 2와 연관: moment를 사용한 날짜 포맷팅
  const currentDate = dayjs().format('YYYY년 MM월 DD일 HH:mm');

  const handleSave = () => {
    alert(
      `저장되었습니다!\n제목: ${title}\n언어: ${language}\n코드 길이: ${content.length}자`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">에디터 페이지</h1>
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
                    lodash 전체를 import → 트리쉐이킹 X (debounce만 사용하지만,
                    전체를 import 했음)
                  </li>
                  <li>moment.js 사용 → 무겁고 레거시된 라이브러리</li>
                  <li>Monaco Editor (3MB+)를 직접 import → 코드 스플리팅 X</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="파일 제목을 입력하세요"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              작성일: {currentDate}
            </label>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                프로그래밍 언어
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                코드 길이
              </label>
              <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
                {content.length} 자
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              코드 에디터 (Monaco Editor - VS Code와 동일)
            </label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              {/* ❌ 문제점 3과 연관: Monaco Editor를 직접 import했음 */}
              <Editor
                height="400px"
                language={language}
                value={content}
                onChange={handleContentChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setContent('// 여기에 코드를 작성하세요...\n')}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              초기화
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
