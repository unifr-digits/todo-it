import { User } from "../users/user";
import { Project } from "../projects/project";
import { Task } from "../tasks/task";

export interface Team {
  name: string;
  desc: string;
  id?: number;
  members: User[];
  modules: string[];
  tasks: Task[]
  projects: Project[]
}
