export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'inprogress' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
    comments: Comment[];
    project_id: string; // Required property
    columnId: string;   // Required property
    columnName: string; // Required property
    team_id: string;    // Required property
}

interface Comment {
    id: string;
    author: string;
    avatar: string;
    content: string;
    createdAt: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    progress: number;
    startDate: string;
    endDate: string;
    teamId: string;
}