import { Project } from "./project";
import { User } from "./user";

export interface Task {
    name: string;
    desc: string;
    id?: number;
    date: string;
    modules: string[];
    done: boolean;
    assignedUsers: User[];
    assignedProjects: Project[];
}