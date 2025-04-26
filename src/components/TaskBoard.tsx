import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Plus, Filter, Search, X } from 'lucide-react';
import TaskColumn from './TaskColumn';
import TaskCard from './TaskCard';
import Button from './Button';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags: string[];
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface FilterOptions {
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  tags?: string[];
}

const TaskBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Implement AI Chat Feature',
          description: 'Add natural language processing capabilities to the chat system',
          priority: 'high',
          assignee: 'John Doe',
          dueDate: '2025-03-15',
          tags: ['feature', 'ai', 'frontend'],
        },
        {
          id: '2',
          title: 'Optimize Model Training',
          description: 'Improve the performance of machine learning model training pipeline',
          priority: 'medium',
          assignee: 'Jane Smith',
          dueDate: '2025-03-20',
          tags: ['optimization', 'ml', 'backend'],
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: '5',
          title: 'API Documentation',
          description: 'Update API documentation with new endpoints',
          priority: 'low',
          assignee: 'Charlie Brown',
          dueDate: '2025-03-05',
          tags: ['documentation', 'api'],
        },
      ],
    },
  ]);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    tags: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns
      .flatMap((col) => col.tasks)
      .find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = columns
      .flatMap((col) => col.tasks)
      .find((task) => task.id === active.id);
    
    if (!activeTask) return;

    const activeColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === active.id)
    );
    const overColumn = columns.find((col) => col.id === over.id);

    if (!activeColumn || !overColumn) return;

    if (activeColumn !== overColumn) {
      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === activeColumn.id) {
            return {
              ...col,
              tasks: col.tasks.filter((task) => task.id !== active.id),
            };
          }
          if (col.id === overColumn.id) {
            return {
              ...col,
              tasks: [...col.tasks, activeTask],
            };
          }
          return col;
        })
      );
    }

    setActiveTask(null);
    setActiveColumn(null);
  };

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: newTask.description || '',
      priority: newTask.priority as 'low' | 'medium' | 'high',
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      tags: newTask.tags || [],
    };

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === 'todo') {
          return {
            ...col,
            tasks: [...col.tasks, task],
          };
        }
        return col;
      })
    );

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      tags: [],
    });
    setShowAddTask(false);
  };

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority = !filters.priority || task.priority === filters.priority;
      const matchesAssignee = !filters.assignee || task.assignee === filters.assignee;
      const matchesTags = !filters.tags?.length || 
        filters.tags.some(tag => task.tags.includes(tag));

      return matchesSearch && matchesPriority && matchesAssignee && matchesTags;
    }),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const allTags = Array.from(
    new Set(columns.flatMap((col) => col.tasks.flatMap((task) => task.tags)))
  );

  const allAssignees = Array.from(
    new Set(columns.flatMap((col) => col.tasks.map((task) => task.assignee)).filter(Boolean))
  );

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/5 to-purple-500/5 rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 relative max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-col items-center justify-center mb-8 text-center">
            <h1 className="m-[30px] text-3xl font-bold text-gray-900 dark:text-white mb-30">
            Zadaci razvoja veštačke inteligencije
            </h1>
         
            
            {/* Centered search and filter controls */}
            <div className="w-full max-w-3xl flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-center">
                <div className="relative flex-grow max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 text-gray-900 dark:text-white"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={16} className="mr-2" />
                    Filter
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setShowAddTask(true)}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Panel - Centered */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority
                  </label>
                  <select
                    value={filters.priority || ''}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value as any })}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                  >
                    <option value="">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assignee
                  </label>
                  <select
                    value={filters.assignee || ''}
                    onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                  >
                    <option value="">All</option>
                    {allAssignees.map((assignee) => (
                      <option key={assignee} value={assignee}>
                        {assignee}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </label>
                  <select
                    multiple
                    value={filters.tags || []}
                    onChange={(e) => setFilters({
                      ...filters,
                      tags: Array.from(e.target.selectedOptions, option => option.value)
                    })}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                  >
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilters({});
                    setShowFilters(false);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}

          {/* Add Task Modal */}
          {showAddTask && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Add New Task
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Priority
                      </label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Assignee
                      </label>
                      <select
                        value={newTask.assignee || ''}
                        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                      >
                        <option value="">Select Assignee</option>
                        {allAssignees.map((assignee) => (
                          <option key={assignee} value={assignee}>
                            {assignee}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newTask.dueDate || ''}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tags
                    </label>
                    <select
                      multiple
                      value={newTask.tags}
                      onChange={(e) => setNewTask({
                        ...newTask,
                        tags: Array.from(e.target.selectedOptions, option => option.value)
                      })}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 text-gray-900 dark:text-white"
                    >
                      {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddTask(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddTask}
                  >
                    Add Task
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {filteredColumns.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={column.tasks}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={activeTask}
                isDragging
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
};

export default TaskBoard;