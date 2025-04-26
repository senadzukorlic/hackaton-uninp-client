import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AlertCircle, Clock, User } from 'lucide-react';
import { Task } from './TaskBoard';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/30',
    medium: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/30',
    high: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/30',
  };

  const tagColors = {
    feature: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    ai: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    frontend: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
    backend: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    optimization: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
    ml: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    security: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    documentation: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    design: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
    api: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white dark:bg-gray-800 rounded-xl p-4
        border border-gray-100 dark:border-gray-700
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:shadow-lg hover:scale-[1.02] transition-all duration-200
        group
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {task.title}
        </h4>
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-sm mb-4">
        {task.assignee && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-full">
            <User size={14} className="mr-1.5" />
            <span className="text-xs font-medium">{task.assignee}</span>
          </div>
        )}
        {task.dueDate && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-full">
            <Clock size={14} className="mr-1.5" />
            <span className="text-xs font-medium">{task.dueDate}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2.5 py-1 text-xs font-medium rounded-full ${tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;