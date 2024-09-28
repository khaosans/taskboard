'use client'

import React, { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, MoreHorizontal, Calendar, MessageSquare } from 'lucide-react'
import {EditTaskModal} from "@/app/taskboard/edit-task-modal";

export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  comments: number
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'high', dueDate: '2023-06-30', comments: 2 },
      { id: '2', title: 'Design mockups', description: 'Create initial design concepts', priority: 'medium', dueDate: '2023-07-15', comments: 0 },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      { id: '3', title: 'Develop MVP', description: 'Build core features of the product', priority: 'high', dueDate: '2023-08-01', comments: 5 },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '4', title: 'Project kickoff', description: 'Initial team meeting and project setup', priority: 'low', dueDate: '2023-06-01', comments: 1 },
    ],
  },
]

const TaskCard: React.FC<{ task: Task; columnId: string; onEdit: (task: Task) => void }> = ({ task, columnId, onEdit }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-2 cursor-move" onClick={() => onEdit(task)}>
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
              {task.comments > 0 && (
                <div className="flex items-center text-xs text-gray-500">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {task.comments}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const Column: React.FC<{ column: Column; moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string) => void; onEditTask: (task: Task) => void }> = ({ column, moveTask, onEditTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string; columnId: string }) => {
      if (item.columnId !== column.id) {
        moveTask(item.id, item.columnId, column.id)
      }
    },
  })

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
          <TaskCard key={task.id} task={task} columnId={column.id} onEdit={onEditTask} />
        ))}
      </ScrollArea>
      <Button variant="outline" className="w-full mt-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add a card
      </Button>
    </div>
  )
}

export default function TrelloBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const moveTask = (taskId: string, sourceColumnId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({ ...column, tasks: [...column.tasks] }))
      const sourceColumn = newColumns.find((col) => col.id === sourceColumnId)
      const targetColumn = newColumns.find((col) => col.id === targetColumnId)
      const taskToMove = sourceColumn?.tasks.find((task) => task.id === taskId)

      if (sourceColumn && targetColumn && taskToMove) {
        sourceColumn.tasks = sourceColumn.tasks.filter((task) => task.id !== taskId)
        targetColumn.tasks.push(taskToMove)
      }

      return newColumns
    })
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleSaveTask = (updatedTask: Task) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      }))
    })
    setEditingTask(null)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Board</h1>
          <div className="flex space-x-2">
            <Input className="w-64" placeholder="Search tasks..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column key={column.id} column={column} moveTask={moveTask} onEditTask={handleEditTask} />
          ))}
          <Button variant="outline" className="h-[calc(100vh-160px)] w-80 flex-shrink-0">
            <PlusCircle className="mr-2 h-4 w-4" /> Add another list
          </Button>
        </div>
      </div>
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveTask}
        />
      )}
    </DndProvider>
  )
}
