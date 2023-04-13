import { Task } from "./task";
export interface Project {
    name: string;
    desc: string;
    id: number;
    modules: string[];
    tasks: Task[];
  }