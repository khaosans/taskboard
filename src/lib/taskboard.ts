import {TaskboardColumn} from "@/lib/taskboardColumn";

export interface Taskboard {
    id: string;
    name: string;
    projectId: string;
    columns: TaskboardColumn[];
}
