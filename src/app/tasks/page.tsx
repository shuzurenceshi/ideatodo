import Link from 'next/link';
import { tasks, categories } from '@/data/tasks';

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 导航 */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-500">
            IdeaToDo
          </Link>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              首页
            </Link>
            <Link href="/plan" className="hover:text-blue-500 transition-colors">
              生成方案
            </Link>
          </div>
        </div>
      </nav>

      {/* 标题 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">热门任务</h1>
          <p className="text-gray-600">选择一个任务，获取完整的 AI 执行方案</p>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {categories.map((category) => {
          const categoryTasks = tasks.filter((t) => t.category === category.id);
          return (
            <section key={category.id} className="mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-sm font-normal text-gray-400">
                  ({categoryTasks.length})
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTasks.map((task) => (
                  <Link
                    key={task.id}
                    href={`/tasks/${task.slug}`}
                    className="card group hover:border-blue-200"
                  >
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-500 transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {task.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex gap-1">
                        {task.tools.slice(0, 2).map((tool, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-50 rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                        查看 →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 底部 CTA */}
      <div className="bg-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">没找到你的任务？</h2>
          <p className="text-gray-600 mb-6">输入你自己的任务，我们来帮你拆解</p>
          <Link href="/" className="btn-primary inline-block">
            自定义任务
          </Link>
        </div>
      </div>
    </main>
  );
}
