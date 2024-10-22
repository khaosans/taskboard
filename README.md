# QuantumLabs Task Management Application 🚀

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Backend Database](#backend-database)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [To Do](#to-do)
- [Inspiration](#inspiration)
- [Live Application](#live-application)
- [AI Disclosure](#ai-disclosure)
- [Contributing](#contributing)
- [License](#license)
- [Changelog](#changelog)

![alt text](public/images/TaskFlow.gif)

## Overview
The **QuantumLabs Task Management Application** is a comprehensive task management tool designed to streamline task creation, management, and organization. It features a user-friendly interface with drag-and-drop functionality and customizable task cards, enabling efficient progress tracking and collaboration. 🌟

## Features
- **Task Management**: Create, edit, and delete tasks with fields such as title, description, priority, and due date. 📝
- **Drag-and-Drop Functionality**: Move tasks between lists (To Do, In Progress, Done) to update their status. 🔄
- **User Authentication**: Secure login and signup using Supabase Auth. 🔐
- **Real-time Updates**: Instant reflection of changes across the application for enhanced collaboration. ⏱️
- **Responsive Design**: Built with Tailwind CSS for a clean interface on all devices. 📱💻
- **Custom Jobs**: Manage custom job types for specific project needs. ⚙️

## Backend Database
- **Supabase**: Utilizes Supabase for a PostgreSQL database with real-time capabilities. 🗄️
- **Database Setup**: Ensure your Supabase project is configured with necessary tables and schemas.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/khaosans/taskboard.git
   cd taskboard
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up Supabase**:
   - Create a Supabase project at [Supabase Dashboard](https://app.supabase.com).
   - Obtain your Supabase URL and Anon Key from the API settings.

4. **Configure environment variables**:
   - Create a `.env.local` file in the root directory and add the following:
     ```plaintext
     SUPABASE_URL=<your-supabase-url>
     SUPABASE_ANON_KEY=<your-supabase-anon-key>
     NEXT_PUBLIC_RPC_URL=<your-rpc-url>
     NEXT_PUBLIC_INFURA_API_KEY=<your-infura-api-key>
     UPSTASH_REDIS_URL=<your-upstash-redis-url>
     UPSTASH_REDIS_TOKEN=<your-upstash-redis-token>
     ```

## Usage
1. **Run the development server**:
   ```bash
   pnpm run dev
   ```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the application. 🌐

3. **Create an account** or **log in** to start managing your tasks.

## Testing
To ensure the application functions as expected, unit tests are included. You can run the tests using the following command:
```bash
pnpm test
```
Make sure all tests pass before making any changes to the codebase. ✅

## To Do
- **Implement AI Agent System**: Integrate AI capabilities for task management and automation. 🤖
- **Add Task Dependencies**: Allow users to set dependencies between tasks. 🔗
- **Milestone Tracking**: Enable users to define and track project milestones. 🎯
- **Customizable Workflows**: Allow users to create tailored workflows for projects. ⚙️
- **Resource Allocation**: Track and manage resources associated with tasks. 📊
- **Cost Tracking**: Implement budget management and cost analysis features. 💰

## Inspiration
The QuantumLabs Task Management Application is inspired by the need for efficient task management in a world increasingly reliant on AI and automation. By integrating advanced AI capabilities with user-friendly design, we aim to empower users to manage their tasks more effectively and focus on what truly matters. 💡

## Live Application
You can access the live application at [QuantumLabs Task Management App](https://the-front-1.vercel.app/landing). 🌟

## AI Disclosure
The QuantumLabs Task Management Application utilizes AI agents to enhance task management and automation. These AI agents analyze data, automate repetitive tasks, and provide insights to improve productivity. While AI agents offer significant benefits, they operate based on probabilistic models and may not always produce deterministic outcomes. Users are encouraged to review and validate AI-generated suggestions to ensure accuracy and relevance. 🤖

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. 📄

## Changelog
- **v1.0.1**: Updated README to reflect current project state and added changelog section.
- **v1.0.0**: Initial release with core task management features.
