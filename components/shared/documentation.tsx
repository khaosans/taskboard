'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Users, CheckSquare, Bot, GitBranch, Wrench, Lightbulb, MessageSquarePlus } from 'lucide-react';
import Mermaid from 'react-mermaid2'; // Import Mermaid component

const Documentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const concepts = [
    { id: "teams", icon: Users, title: "Teams", description: "Collaborative groups working on projects" },
    { id: "tasks", icon: CheckSquare, title: "Tasks", description: "Actionable items within projects" },
    { id: "agents", icon: Bot, title: "Agents", description: "AI-powered assistants for task automation" },
    { id: "pipelines", icon: GitBranch, title: "Pipelines", description: "Predefined workflows for projects" },
    { id: "tools", icon: Wrench, title: "Tools", description: "Integrations to extend functionality" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Task-Flow Documentation</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {concepts.map((concept) => (
            <TabsTrigger key={concept.id} value={concept.id}>{concept.title}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Task-Flow: Streamlining Project Management</CardTitle>
              <CardDescription>
                Task-Flow is a comprehensive task management system designed to enhance productivity and streamline project workflows.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our platform is built around five core concepts: Teams, Tasks, Agents, Pipelines, and Tools. Understanding these concepts and their interactions is crucial for effectively using and extending the Task-Flow platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {concepts.map((concept) => (
                  <Card key={concept.id} className="bg-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <concept.icon className="mr-2 h-6 w-6" />
                        {concept.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{concept.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {concepts.map((concept) => (
          <TabsContent key={concept.id} value={concept.id}>
            <ConceptDetails concept={concept} />
          </TabsContent>
        ))}
      </Tabs>
      <PromptEngineeringTip />
    </div>
  );
};

// Explicitly type the 'concept' parameter
function ConceptDetails({ concept }: { concept: { id: string; icon: React.ComponentType<{ className?: string }>; title: string; description: string } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <concept.icon className="mr-2 h-6 w-6" />
          {concept.title}
        </CardTitle>
        <CardDescription>{concept.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <h3 className="text-lg font-semibold mb-2">Key Characteristics:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {getConceptDetails(concept.id).map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Concept Diagram:</h3>
            <Mermaid chart={getConceptDiagram(concept.id)} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function PromptEngineeringTip() {
  return (
    <Card className="mt-8 bg-blue-900">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-6 w-6" />
          Prompt Engineering Tip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          When working with AI agents in Task-Flow, use clear and specific language in your prompts. For example, instead of "Improve this code," try "Refactor this JavaScript function to improve performance and readability, focusing on reducing nested callbacks and optimizing loop operations."
        </p>
        <div className="mt-4">
          <Button variant="secondary" className="flex items-center">
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Try Prompt Engineering
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Explicitly type the 'conceptId' parameter
function getConceptDetails(conceptId: string): string[] {
  switch (conceptId) {
    case 'teams':
      return [
        "Teams can have multiple members with different roles (e.g., admin, member, viewer).",
        "Each team can have multiple projects or workspaces.",
        "Teams provide a context for collaboration and resource sharing."
      ];
    case 'tasks':
      return [
        "Tasks have attributes such as title, description, status, priority, and due date.",
        "Tasks can be assigned to team members or agents.",
        "Tasks can be organized into projects or pipelines.",
        "Tasks may have subtasks, creating a hierarchical structure."
      ];
    case 'agents':
      return [
        "Agents can be specialized for different types of tasks (e.g., code review, documentation, testing).",
        "Agents can be assigned to tasks to provide assistance or automation.",
        "Agents can interact with team members, providing suggestions or completing routine tasks."
      ];
    case 'pipelines':
      return [
        "Pipelines define the stages of a workflow (e.g., Planning, Development, Testing, Deployment).",
        "Tasks move through pipeline stages as they progress.",
        "Pipelines can have automated triggers or conditions for moving tasks between stages.",
        "Pipelines provide visibility into the overall progress of a project or process."
      ];
    case 'tools':
      return [
        "Tools can include integrations with version control systems, CI/CD platforms, communication tools, etc.",
        "Tools can be associated with specific tasks or pipeline stages.",
        "Tools enhance the capabilities of Task-Flow by connecting it to the broader ecosystem of development and project management software."
      ];
    default:
      return [];
  }
}

// Explicitly type the 'conceptId' parameter
function getConceptDiagram(conceptId: string): string {
  const diagrams: Record<string, string> = {
    teams: `graph TD
    Team --> Member1[Team Member]
    Team --> Member2[Team Member]
    Team --> Admin[Team Admin]
    Team --> Project1[Project]
    Team --> Project2[Project]
    Project1 --> Task1[Task]
    Project1 --> Task2[Task]
    Project2 --> Task3[Task]`,
    tasks: `stateDiagram-v2
    [*] --> Created
    Created --> InProgress: Assign
    InProgress --> Review: Complete
    Review --> Done: Approve
    Review --> InProgress: Request Changes
    Done --> [*]`,
    agents: `sequenceDiagram
    participant User
    participant Agent
    participant Task
    User->>Agent: Assign to task
    Agent->>Task: Analyze task
    Agent->>User: Provide suggestions
    User->>Task: Update task
    Agent->>Task: Perform automated actions
    Task->>User: Update status`,
    pipelines: `graph LR
    Start((Start)) --> Planning
    Planning --> Development
    Development --> Testing
    Testing --> Deployment
    Deployment --> End((End))
    subgraph Pipeline
    Planning
    Development
    Testing
    Deployment
    end`,
    tools: `graph TD
    Task --> GitIntegration[Git Integration]
    Task --> CITool[CI Tool]
    Pipeline --> DeploymentTool[Deployment Tool]
    Agent --> AnalysisTool[Code Analysis Tool]
    subgraph External Tools
    GitIntegration
    CITool
    DeploymentTool
    AnalysisTool
    end`
  };

  return diagrams[conceptId];
}

export default Documentation;