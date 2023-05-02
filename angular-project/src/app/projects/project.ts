import { Task } from '../tasks/task';
export interface Project {
  id: number;
  name: string;
  desc: string;
  modules: string[];
  tasks: Task[];
}
