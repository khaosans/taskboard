'use client';

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MoreHorizontal, Calendar, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Task } from '@/lib/task';

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [],
  },
];

const TaskCard: React.FC<{ task: Task; columnId: string; moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string) => void }> = ({ task, columnId, moveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Link href={`/task/${task.id}`} className="cursor-pointer">
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Card className="mb-2 cursor-move">
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-xs text-gray-500 mb-2">{task.description}</p>
            <div className="flex justify-between items-center">
              <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                {task.priority}
              </Badge>
              <div className="flex items-center space-x-2">
                {task.dueDate && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {task.dueDate}
                  </div>
                )}
                {task.comments.length > 0 && (
                  <div className="flex items-center text-xs text-gray-500">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {task.comments.map((comment) => (
                      <div key={comment.content}>{comment.content}</div>

                      
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

const Column: React.FC<{ column: Column; moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string) => void }> = ({ column, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== column.id) {
        moveTask(item.id, item.columnId, column.id);
      }
    },
  });

  return (
    <div ref={drop} className="bg-gray-100 p-4 rounded-lg w-80 flex-shrink-0">
      <h3 className="font-bold mb-4 flex justify-between items-center">
        {column.title}
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </h3>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} moveTask={moveTask} />
        ))}
      </ScrollArea>
      <Button variant="outline" className="w-full mt-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add a card
      </Button>
    </div>
  );
};

interface DashboardProps {
  initialTasks: Task[];
}

export default function Dashboard({ initialTasks }: DashboardProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns.map(column => ({
    ...column,
    tasks: initialTasks.filter(task => task.status === column.id) // Filter tasks based on their status
  })));

  const moveTask = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({ ...column, tasks: [...column.tasks] }));
      const sourceColumn = newColumns.find((col) => col.id === sourceColumnId);
      const targetColumn = newColumns.find((col) => col.id === targetColumnId);
      const taskToMove = sourceColumn?.tasks.find((task) => task.id === taskId);

      if (sourceColumn && targetColumn && taskToMove) {
        sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== taskId);
        targetColumn.tasks.push(taskToMove);
      }

      return newColumns;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <Input className="w-64" placeholder="Search tasks..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column key={column.id} column={column} moveTask={moveTask} />
          ))}
          <Button variant="outline" className="h-[calc(100vh-160px)] w-80 flex-shrink-0">
            <PlusCircle className="mr-2 h-4 w-4" /> Add another list
          </Button>
        </div>
      </div>
    </DndProvider>
  );
}