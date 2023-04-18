import { Project } from "../projects/project";
import { User } from "../users/user";

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
