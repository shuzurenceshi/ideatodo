'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { tasks, matchTask, getGenericTask, categories } from '@/data/tasks';
import type { TaskTemplate } from '@/data/tasks';

function PlanContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [task, setTask] = useState<TaskTemplate | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (query) {
      const matched = matchTask(query);
      setTask(matched || getGenericTask(query));
    }
  }, [query]);

  const copyPrompt = async () => {
    if (task?.prompt) {
      await navigator.clipboard.writeText(task.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-bold mb-4">请输入你想完成的任务</h1>
          <p className="text-gray-600 mb-8">返回首页，告诉我们你想用 AI 做什么</p>
          <Link href="/" className="btn-primary inline-block">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="animate-pulse">加载中...</div>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === task.category);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 导航 */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-500">
            IdeaToDo
          </Link>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/tasks" className="hover:text-blue-500 transition-colors">
              热门任务
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 查询提示 */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-gray-600">你的任务：</span>
          <span className="font-medium text-gray-900 ml-2">{query}</span>
        </div>

        {/* 任务方案 */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* 头部 */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                  {category.icon} {category.name}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
            <p className="text-gray-600">{task.summary}</p>
          </div>

          {/* 内容 */}
          <div className="p-6 space-y-8">
            {/* 适合人群 */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>👥</span> 适合人群
              </h2>
              <div className="flex flex-wrap gap-2">
                {task.audience.map((a, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                    {a}
                  </span>
                ))}
              </div>
            </section>

            {/* 推荐工具 */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>🛠️</span> 推荐工具
              </h2>
              <div className="flex flex-wrap gap-2">
                {task.tools.map((tool, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* 步骤拆解 */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>📋</span> 步骤拆解
              </h2>
              <ol className="space-y-3">
                {task.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* 提示词 */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>✨</span> AI 提示词
              </h2>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                  {task.prompt}
                </pre>
                <button
                  onClick={copyPrompt}
                  className="absolute top-2 right-2 px-3 py-1 bg-white text-gray-700 rounded text-sm hover:bg-gray-100 transition-colors"
                >
                  {copied ? '✓ 已复制' : '复制'}
                </button>
              </div>
            </section>

            {/* 常见错误 */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>⚠️</span> 常见错误
              </h2>
              <ul className="space-y-2">
                {task.mistakes.map((mistake, i) => (
                  <li key={i} className="flex gap-2 text-gray-600">
                    <span className="text-red-400">✗</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </section>

            {/* 检查清单 */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>✅</span> 检查清单
              </h2>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <ul className="space-y-2">
                  {task.checklist.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <input type="checkbox" className="mt-1 accent-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 交付模板 */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>📄</span> 交付模板
              </h2>
              <pre className="bg-gray-50 border border-gray-200 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                {task.deliverableTemplate}
              </pre>
            </section>
          </div>
        </article>

        {/* 底部导航 */}
        <div className="mt-8 flex justify-between items-center">
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            ← 返回首页
          </Link>
          <Link href="/tasks" className="text-blue-500 hover:text-blue-600">
            查看更多任务 →
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <PlanContent />
    </Suspense>
  );
}
