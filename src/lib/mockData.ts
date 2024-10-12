import { Task } from "@/lib/task";
import { Project } from "@/lib/project";

export const fetchMockTasks = (): Task[] => {
    return [
    ];
};

export const fetchMockProjects = (): Project[] => {
    return [
    ];
};

export const fetchMockActivityData = () => {
    return [
        { name: 'Mon', tasks: 3 },
        { name: 'Tue', tasks: 5 },
        { name: 'Wed', tasks: 2 },
        { name: 'Thu', tasks: 7 },
        { name: 'Fri', tasks: 4 },
        { name: 'Sat', tasks: 1 },
        { name: 'Sun', tasks: 0 },
    ];
};

export const mockData = {
    teams: [
        {
            id: 0,
            name: 'Team 0',
            tasks: [
                { id: 1, title: 'Task 1', completed: false },
                { id: 2, title: 'Task 2', completed: true },
            ],
        },
        {
            id: 1,
            name: 'Team 1',
            tasks: [
                { id: 3, title: 'Task 3', completed: false },
                { id: 4, title: 'Task 4', completed: true },
            ],
        },
        // Add more teams and tasks as needed
    ],
};

export const initialTasks = [
    { id: '1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'high', dueDate: '2023-06-30', comments: 2, status: 'todo' },
    { id: '2', title: 'Design mockups', description: 'Create initial design concepts', priority: 'medium', dueDate: '2023-07-15', comments: 0, status: 'todo' },
    { id: '3', title: 'Develop MVP', description: 'Build core features of the product', priority: 'high', dueDate: '2023-08-01', comments: 5, status: 'inprogress' },
    { id: '4', title: 'Project kickoff', description: 'Initial team meeting and project setup', priority: 'low', dueDate: '2023-06-01', comments: 1, status: 'done' },
];
