'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, ChevronDown, Plus, Trash2, Edit } from 'lucide-react';
import { Checkbox } from '@geist-ui/react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignedAgent: string | null;
  subtasks: Task[];
}

interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'Develop a new product feature',
    status: 'In Progress',
    assignedAgent: '1',
    subtasks: []
  },
  {
    id: '2',
    title: 'Marketing Campaign',
    description: 'Plan and execute Q3 marketing campaign',
    status: 'To Do',
    assignedAgent: null,
    subtasks: []
  }
];

const aiAgents: AIAgent[] = [
  { id: '1', name: 'Project Manager AI', avatar: '/placeholder.svg?height=32&width=32', specialty: 'Project Management' },
  { id: '2', name: 'Design AI', avatar: '/placeholder.svg?height=32&width=32', specialty: 'UI/UX Design' },
  { id: '3', name: 'Backend AI', avatar: '/placeholder.svg?height=32&width=32', specialty: 'Backend Development' },
  { id: '4', name: 'Marketing AI', avatar: '/placeholder.svg?height=32&width=32', specialty: 'Digital Marketing' },
];

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'subtasks'>>({
    title: '',
    description: '',
    status: 'To Do',
    assignedAgent: null
  });

  const toggleExpand = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const addTask = () => {
    const newTaskWithId = { ...newTask, id: Date.now().toString(), subtasks: [] };
    setTasks(prevTasks => [...prevTasks, newTaskWithId]);
    setNewTask({ title: '', description: '', status: 'To Do', assignedAgent: null });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const renderTask = (task: Task, level: number = 0) => (
    <Card key={task.id} className={`mb-4 ${level > 0 ? 'ml-6' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center">
          {task.subtasks.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => toggleExpand(task.id)}>
              {expandedTasks.has(task.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          {task.assignedAgent && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={aiAgents.find(agent => agent.id === task.assignedAgent)?.avatar} />
              <AvatarFallback><Trash2 className="h-4 w-4" /></AvatarFallback>
            </Avatar>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" value={task.title} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" value={task.description} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select defaultValue={task.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="agent" className="text-right">Assigned Agent</Label>
                  <Select defaultValue={task.assignedAgent || undefined}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiAgents.map(agent => (
                        <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">{task.description}</p>
        <div className="flex items-center space-x-2">
          <Checkbox id={`task-${task.id}`} />
          <Label htmlFor={`task-${task.id}`}>{task.status}</Label>
        </div>
        {expandedTasks.has(task.id) && task.subtasks.length > 0 && (
          <div className="mt-4">
            {task.subtasks.map(subtask => renderTask(subtask, level + 1))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Task Manager</h1>
      <div className="mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-title" className="text-right">Title</Label>
                <Input
                  id="new-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-description" className="text-right">Description</Label>
                <Textarea
                  id="new-description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-status" className="text-right">Status</Label>
                <Select onValueChange={(value) => setNewTask({ ...newTask, status: value as 'To Do' | 'In Progress' | 'Done' })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-agent" className="text-right">Assigned Agent</Label>
                <Select onValueChange={(value) => setNewTask({ ...newTask, assignedAgent: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiAgents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => addTask()}>Add Task</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {tasks.map(task => renderTask(task))}
      </div>
    </div>
  );
}