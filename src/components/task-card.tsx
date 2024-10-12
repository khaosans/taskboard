'use client';

import { Task } from '@/lib/task';
import React from 'react';

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            {task.dueDate && <p>Due Date: {task.dueDate}</p>}
            <div>
                {task.comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.content}</p>
                        <p>{comment.author || 'Anonymous'   }</p>
                        <p>{comment.createdAt}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskCard;