import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { Column, Task } from './TaskBoard';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const columnColors = {
    'todo': 'border-blue-500/20',
    'in-progress': 'border-purple-500/20',
    'review': 'border-yellow-500/20',
    'done': 'border-green-500/20',
  };

  return (
    <div
      ref={setNodeRef}
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border-t-4 ${columnColors[column.id as keyof typeof columnColors]}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {column.title}
          </h3>
          <span className="ml-2 px-2.5 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <Plus size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <SortableContext
        items={tasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskColumn;