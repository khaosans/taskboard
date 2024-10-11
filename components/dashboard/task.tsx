import React from 'react';

interface TaskProps {
    id: string;
}

const Task: React.FC<TaskProps> = ({ id }) => {
    return <div>Task ID: {id}</div>;
};

export default Task;