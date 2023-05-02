import { User } from '../users/user';
import { Project } from '../projects/project';
import { Task } from '../tasks/task';

export interface Team {
  id?: number;
  name: string;
  desc: string;
  members: User[];
  modules: string[];
  tasks: Task[];
  projects: Project[];
}
