import { Project } from '../projects/project';
import { User } from '../users/user';
import { uuid } from 'uuidv4';


export interface Task {
  task_id?: number;
  name: string;
  desc: string;
  date: string;
  modules: string[];
  done: boolean;
  assignedUsers: User[];
  assignedProjects: Project[];
}
