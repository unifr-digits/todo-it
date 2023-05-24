import { Task } from '../tasks/task';

export interface Project {
  project_id?: number;
  name: string;
  desc: string;
  tasks: Task[];
}
