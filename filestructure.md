# Project File Structure

This document outlines the file structure for our Next.js application using TypeScript. The structure is designed to promote modularity, scalability, and maintainability, leveraging the latest features of Next.js, including app routing, hooks, and actions.

## Frontend Structure

### Components

- **components/auth/**: Contains all authentication-related components, such as login, sign-up, and authentication handlers.
  - 
  - 
  - 
  - 
  - 
  - 

- **components/agent/**: Contains components related to agent views and details.
  - 
  - 

- **components/chat/**: Contains chat-related components, including chat icons, layouts, and modals.
  - 
  - 
  - 
  - 

- **components/dashboard/**: Contains components for the dashboard, including task management and data visualization.
  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 

- **components/**: General components that do not fit into the above categories.
  - 
  - 
  - 
  - 
  - 
  - 
  - 
  - 

## Backend Structure

- **lib/**: Contains utility functions and configurations for interacting with external services, such as Supabase.
  - : Configuration and client setup for Supabase.

- **pages/api/**: Contains API route handlers for server-side logic, such as authentication and data fetching.

## Design Patterns

- **Modularity**: Each component is designed to have a single responsibility, making it easier to maintain and test.
- **TypeScript**: Strong typing is used throughout the project to catch errors early and improve code readability.
- **Hooks**: React hooks are used for managing state and side effects, promoting functional programming practices.
- **App Routing**: Next.js app routing is used to define page structures and API routes, leveraging server-side rendering where necessary.

## Expected File Pattern

For any new developer or AI model, the following pattern should be followed:

1. **Component Naming**: Use PascalCase for component files and directories.
2. **Directory Structure**: Group related components into directories based on their functionality (e.g., auth, chat, dashboard).
3. **TypeScript**: Use TypeScript for all new files to ensure type safety.
4. **Hooks and Actions**: Utilize React hooks for state management and side effects. Define actions in a separate file if they are complex or reused across components.
5. **Absolute Imports**: Use absolute paths for imports to improve readability and avoid relative path issues.

By following this structure, we ensure a consistent and scalable codebase that is easy to navigate and extend.

