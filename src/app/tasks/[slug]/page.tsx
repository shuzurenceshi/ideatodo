import { tasks, categories } from '@/data/tasks';
import TaskDetailClient from './TaskDetailClient';

// 静态导出需要的参数生成
export function generateStaticParams() {
  return tasks.map((task) => ({
    slug: task.slug,
  }));
}

// 服务端组件 - 获取数据
export default function TaskDetailPage({ params }: { params: { slug: string } }) {
  const task = tasks.find((t) => t.slug === params.slug);
  const category = task ? categories.find((c) => c.id === task.category) : null;
  
  return <TaskDetailClient task={task || null} category={category || null} />;
}
