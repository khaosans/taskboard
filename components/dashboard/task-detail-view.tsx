'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import {  TaskDetailViewProps } from '@/types';



//DO NOT CHANGE THE USE OF USEPARAMS can be used for the taskId
const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, isOpen, onClose, onUpdate, params }) => {
  const handleUpdate = () => {
    // Logic to update the task (this could involve opening a modal or similar)
    const updatedTask = { ...task, status: 'Completed' }; // Example update
    onUpdate(updatedTask);
  };
  const taskId = params.taskId;

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-content bg-gray-800 text-white p-4 rounded">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p>{task.description}</p>
        <p><strong>Objective:</strong> {task.objective}</p>
        <p><strong>Difficulty:</strong> {task.difficulty}</p>
        <p><strong>Estimated Time:</strong> {task.estimatedTime}</p>
        <div>
          <strong>Assigned Agents:</strong>
          <ul>
            {task.assignedAgents.map(agent => (
              <li key={agent.id}>
                {agent.name} - {agent.expertise}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={handleUpdate} className="bg-blue-500">Update Task</Button>
          <Button onClick={onClose} className="bg-red-500">Close</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailView;
