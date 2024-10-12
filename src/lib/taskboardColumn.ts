import {Task} from "@/lib/task";

export interface TaskboardColumn {
    id: string;
    name: string;
    taskIds: string[];
    tasks: Task[];
}
