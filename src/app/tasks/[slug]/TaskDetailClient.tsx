'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { TaskTemplate } from '@/data/tasks';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Props {
  task: TaskTemplate | null;
  category: Category | null;
}

export default function TaskDetailClient({ task, category }: Props) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    if (task?.prompt) {
      await navigator.clipboard.writeText(task.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4">任务未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，我们没有找到这个任务</p>
          <Link href="/tasks" className="btn-primary inline-block">
            查看所有任务
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 导航 */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-500">
            IdeaToDo
          </Link>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              首页
            </Link>
            <Link href="/tasks" className="hover:text-blue-500 transition-colors">
              热门任务
            </Link>
          </div>
        </div>
      </nav>

      {/* 面包屑 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-500">首页</Link>
            <span className="mx-2">/</span>
            <Link href="/tasks" className="hover:text-blue-500">热门任务</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{task.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 任务方案 */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* 头部 */}
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center gap-2 mb-3">
              {category && (
                <span className="text-sm px-3 py-1 bg-white border border-gray-200 rounded-full">
                  {category.icon} {category.name}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-3">{task.title}</h1>
            <p className="text-lg text-gray-600">{task.summary}</p>
          </div>

          {/* 内容 */}
          <div className="p-6 md:p-8 space-y-8">
            {/* 适合人群 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">👥</span> 适合人群
              </h2>
              <div className="flex flex-wrap gap-2">
                {task.audience.map((a, i) => (
                  <span key={i} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">
                    {a}
                  </span>
                ))}
              </div>
            </section>

            {/* 推荐工具 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">🛠️</span> 推荐工具
              </h2>
              <div className="flex flex-wrap gap-3">
                {task.tools.map((tool, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 rounded-lg font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* 步骤拆解 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">📋</span> 步骤拆解
              </h2>
              <ol className="space-y-4">
                {task.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
                    <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* 提示词 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">✨</span> AI 提示词
                <span className="text-xs font-normal text-gray-400">点击复制，直接使用</span>
              </h2>
              <div className="relative group">
                <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm leading-relaxed">
                  {task.prompt}
                </pre>
                <button
                  onClick={copyPrompt}
                  className={`absolute top-3 right-3 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {copied ? '✓ 已复制' : '复制提示词'}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 mt-2">✓ 提示词已复制到剪贴板，可直接粘贴到 AI 工具中使用</p>
              )}
            </section>

            {/* 常见错误 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">⚠️</span> 常见错误
              </h2>
              <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                <ul className="space-y-3">
                  {task.mistakes.map((mistake, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-red-400 text-lg">✗</span>
                      <span className="text-gray-700">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 检查清单 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span> 完成检查清单
              </h2>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                <p className="text-sm text-green-600 mb-4">完成任务后，用这个清单检查质量：</p>
                <ul className="space-y-3">
                  {task.checklist.map((item, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-green-500 rounded"
                        id={`check-${i}`}
                      />
                      <label htmlFor={`check-${i}`} className="text-gray-700 cursor-pointer">
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 交付模板 */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="text-xl">📄</span> 交付模板
              </h2>
              <pre className="bg-gray-50 border border-gray-200 rounded-xl p-5 overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap">
                {task.deliverableTemplate}
              </pre>
            </section>
          </div>
        </article>

        {/* 底部导航 */}
        <div className="mt-8 flex justify-between items-center">
          <Link href="/tasks" className="text-blue-500 hover:text-blue-600 font-medium">
            ← 返回任务列表
          </Link>
          <Link href="/" className="text-blue-500 hover:text-blue-600 font-medium">
            自定义任务 →
          </Link>
        </div>
      </div>
    </main>
  );
}
