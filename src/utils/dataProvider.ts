import { Task, Project } from '../lib/task';
import { TeamMember } from '../lib/teamMember';

// Example data provider functions
const getTasks = async (): Promise<Task[]> => {
  return [
    // Add more tasks as needed
  ];
};

const getProjects = async (): Promise<Project[]> => {
  return [
    { id: '1', name: 'Project A', description: 'Description of Project A', progress: 0, startDate: '2023-01-01', endDate: '2023-12-31', teamId: '1' },
  ];
};

const getTeamMembers = async (): Promise<TeamMember[]> => {
  return [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Team Lead', avatar: 'https://avatar.vercel.sh/john.png', project_id: '1', team_id: '1' },
  ];
};

// Export the data provider functions
export { getTasks, getProjects, getTeamMembers };
