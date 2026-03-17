import Link from 'next/link';
import { tasks, categories } from '@/data/tasks';
import AuthButton from '@/components/AuthButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 导航 */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-500">
            IdeaToDo
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/tasks" className="hover:text-blue-500 transition-colors">
              热门任务
            </Link>
            <Link href="/plan" className="hover:text-blue-500 transition-colors">
              生成方案
            </Link>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            把你的任务，变成 AI 能做的事
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            输入一句话，获得完整的 AI 执行方案
          </p>
          
          {/* 输入框 */}
          <form action="/plan" method="get" className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              name="query"
              placeholder="输入你想用 AI 完成的任务，如：写周报、做PPT、写会议纪要..."
              className="input-field flex-1 text-base"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              生成我的 AI 方案
            </button>
          </form>
        </div>
      </section>

      {/* 三步说明 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">只需三步</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: '描述任务', desc: '用一句话描述你想做的事' },
              { step: '2', title: '获得方案', desc: 'AI 自动匹配最佳执行方案' },
              { step: '3', title: '复制提示词', desc: '一键复制，立即开始执行' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 热门任务分类 */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">热门任务</h2>
          {categories.map((category) => (
            <div key={category.id} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                {category.icon} {category.name}
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tasks
                  .filter((task) => task.category === category.id)
                  .map((task) => (
                    <Link
                      key={task.id}
                      href={`/tasks/${task.slug}`}
                      className="card hover:border-blue-200"
                    >
                      <h4 className="font-medium text-blue-600 mb-1">{task.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2">{task.summary}</p>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-8">
            <Link href="/tasks" className="text-blue-500 hover:text-blue-600 font-medium">
              查看全部任务 →
            </Link>
          </div>
        </div>
      </section>

      {/* 痛点说明 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">你是否遇到这些问题？</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              '知道 AI 很强，但不知道怎么用在工作中',
              '想用 AI，但不知道从哪个任务开始',
              '试过 AI，但输出的内容总差点意思',
              '想学习 AI，但网上的教程太碎片化',
            ].map((pain, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-red-400 text-xl">😣</span>
                <span className="text-gray-700">{pain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 示例演示 */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">看看效果</h2>
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4 text-gray-500">
              <span>💡</span>
              <span className="text-sm">示例：输入"写周报"</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">AI 会给你：</p>
                <ul className="space-y-2 text-sm">
                  <li>✅ 推荐使用的 AI 工具</li>
                  <li>✅ 分步骤执行指南</li>
                  <li>✅ 可直接使用的提示词</li>
                  <li>✅ 常见错误和检查清单</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 适合人群 */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">适合谁用？</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '👨‍💼', title: '职场新人', desc: '快速上手 AI 提效' },
              { icon: '👩‍💻', title: '内容创作者', desc: 'AI 辅助内容生产' },
              { icon: '👨‍🔬', title: '研究人员', desc: 'AI 加速文献工作' },
              { icon: '👩‍🏫', title: '自由职业者', desc: '一个人干多个人的活' },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-gray-100 rounded-lg">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-medium mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">开始你的第一个 AI 任务</h2>
          <p className="text-gray-600 mb-8">输入任务，获得方案，立即行动</p>
          <form action="/plan" method="get" className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              name="query"
              placeholder="输入你想用 AI 完成的任务..."
              className="input-field flex-1"
              required
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              立即生成方案
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center text-sm">
          <p className="mb-2">IdeaToDo - 帮助 AI 新手把传统任务转成 AI 可执行流程</p>
          <p>© 2026 IdeaToDo. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
