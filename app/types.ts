export interface Task {
  id: number;
  title: string;
  description: string;
  objective: string;
  difficulty: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedTime: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Completed';
  assignedAgents: Agent[];
  recommendedTools: string[];
}

export interface Agent {
  id: number;
  name: string;
  avatar: string;
  expertise: string;
}

export interface Wallet {
  address: string;
  total_usd_value: number;
}
