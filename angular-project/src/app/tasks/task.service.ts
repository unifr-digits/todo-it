import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from './task';
import { TASKS } from './mock-tasks';
import { User } from '../users/user';
import { Project } from '../projects/project';

@Injectable({ providedIn: 'root' })
export class TaskService {
  allTasks = TASKS;

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }

  addTask(
    name: string,
    desc: string,
    date: string,
    modules: string[],
    assignedUsers: User[],
    assignedProjects: Project[]
  ) {
    const min = 1;
    const max = 100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    this.allTasks.unshift({
      name,
      desc,
      id: randomInt,
      date,
      modules,
      done: false,
      assignedUsers,
      assignedProjects,
    });
  }

  deleteTask(task: Task) {
    this.allTasks.splice(this.allTasks.indexOf(task), 1);
  }
}
