import { User } from '../users/user';
import { Project } from '../projects/project';
import { Task } from '../tasks/task';

export interface Team {
  team_id?: number;
  name: string;
  description: string;
  members: User[];
  tasks: Task[];
  projects: Project[];
}
