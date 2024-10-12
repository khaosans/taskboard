export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    comments: number;
    status: 'todo' | 'inprogress' | 'done';
}

export interface Team {
    id: string;
    name: string;
    description: string;
    members: string[];
}

export interface Member {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Editor' | 'Viewer';
}

// Mock data
const tasks: Task[] = [
    { id: '1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'high', dueDate: '2023-06-30', comments: 2, status: 'todo' },
    { id: '2', title: 'Design mockups', description: 'Create initial design concepts', priority: 'medium', dueDate: '2023-07-15', comments: 0, status: 'todo' },
    { id: '3', title: 'Develop MVP', description: 'Build core features of the product', priority: 'high', dueDate: '2023-08-01', comments: 5, status: 'inprogress' },
    { id: '4', title: 'Project kickoff', description: 'Initial team meeting and project setup', priority: 'low', dueDate: '2023-06-01', comments: 1, status: 'done' },
];

const teams: Team[] = [
    { id: '1', name: 'Team Alpha', description: 'Focuses on product development.', members: ['1', '2'] },
    { id: '2', name: 'Team Beta', description: 'Handles marketing and outreach.', members: ['3'] },
];

const members: Member[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
];

// Functions to get data
export const getTasks = () => tasks;
export const getTeams = () => teams;
export const getMembers = () => members;