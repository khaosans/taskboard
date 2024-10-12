import React, { useEffect, useState } from 'react';
import { Task } from '@/lib/task'; // Import the Task type
import { getTasks } from '@/utils/dataProvider'; // Update the import
import Mermaid from 'react-mermaid2'; // Import Mermaid component

const Taskboard: React.FC<{ initialTasks: Task[] }> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Taskboard</h1>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>Status: {task.status}</p>
          </div>
        ))
      )}
      {/* Example Mermaid Diagram */}
      <Mermaid chart={`graph TD; A-->B; A-->C; B-->D; C-->D;`} />
    </div>
  );
};

export default Taskboard;