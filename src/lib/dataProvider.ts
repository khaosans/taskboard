import { Task } from './task';

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  teamId: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: TeamMember[];
}

export interface TeamMember {
  [x: string]: any;
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Taskboard {
  id: string;
  name: string;
  projectId: string;
  columns: TaskboardColumn[];
}

export interface TaskboardColumn {
  id: string;
  name: string;
  taskIds: string[];
}

export interface Settings {
  userId: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface ActivityData {
  name: string;
  tasks: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  project_id: string;
  team_id: string;
  avatar_url: string;
}

// Mock data
const mockTasks: Task[] = [
  // Add mock tasks here if needed
];

const mockProjects: Project[] = [
];

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Development Team',
    description: 'Responsible for building and maintaining our products',
    createdAt: '2023-06-01',
    members: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead', avatar: 'https://avatar.vercel.sh/john.png' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatar: 'https://avatar.vercel.sh/jane.png' },
    ]
  },
  {
    id: '2',
    name: 'Design Team',
    description: 'Creates user interfaces and experiences',
    createdAt: '2023-06-15',
    members: [
      { id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'UI/UX Designer', avatar: 'https://avatar.vercel.sh/alice.png' },
    ]
  },
];

const mockTaskboards: Taskboard[] = [
  {
    id: '1',
    name: 'Website Redesign Board',
    projectId: '1',
    columns: [
      { id: 'col1', name: 'To Do', taskIds: ['2'] },
      { id: 'col2', name: 'In Progress', taskIds: ['1', '5'] },
      { id: 'col3', name: 'Done', taskIds: ['3'] },
    ]
  },
  {
    id: '2',
    name: 'Mobile App Board',
    projectId: '2',
    columns: [
      { id: 'col1', name: 'Backlog', taskIds: ['4'] },
      { id: 'col2', name: 'In Development', taskIds: [] },
      { id: 'col3', name: 'Testing', taskIds: [] },
      { id: 'col4', name: 'Completed', taskIds: [] },
    ]
  },
];

const mockSettings: Settings = {
  userId: '1',
  theme: 'light',
  notifications: true,
  language: 'en',
};

const mockWeeklyActivity: ActivityData[] = [
  { name: 'Mon', tasks: 3 },
  { name: 'Tue', tasks: 5 },
  { name: 'Wed', tasks: 2 },
  { name: 'Thu', tasks: 7 },
  { name: 'Fri', tasks: 4 },
  { name: 'Sat', tasks: 1 },
  { name: 'Sun', tasks: 0 },
];

const mockMembers: Member[] = [
  // Add mock members here if needed
];

export const mockClient = {
  fetchTasks: async (): Promise<Task[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockTasks), 1000));
  },
  fetchProjects: async (): Promise<Project[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockProjects), 1000));
  },
  fetchTeams: async (): Promise<Team[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockTeams), 1000));
  },
  fetchTaskboards: async (): Promise<Taskboard[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockTaskboards), 1000));
  },
  fetchSettings: async (): Promise<Settings> => {
    return new Promise(resolve => setTimeout(() => resolve(mockSettings), 1000));
  },
  fetchWeeklyActivity: async (): Promise<ActivityData[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockWeeklyActivity), 1000));
  },
  fetchMembers: async (): Promise<Member[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockMembers), 1000));
  },
};