import { User } from "./user";

export interface Task {
    name: string;
    desc: string;
    id: number;
    date: string;
    modules: string[];
    done: boolean;
    assignedUsers: string[];
    assignedProjects: string[];
}