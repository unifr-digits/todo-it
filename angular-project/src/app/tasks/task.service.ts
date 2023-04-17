import { Injectable } from '@angular/core';

import { Task } from './task';
import { TASKS } from './mock-tasks';
import { User } from '../users/user';
import { Project } from '../projects/project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  allTasks = TASKS;

  constructor() {}

  get tasks() {
    return this.allTasks;
  }

  addTask(name: string, desc: string, id: number, date: string, modules: string[],assignedUsers:User[],assignedProjects:Project[]) {
    this.allTasks.unshift({
      name,
      desc,
      id,
      date,
      modules,
      done: false,
      assignedUsers,
      assignedProjects
    });
  }

  deleteTask(task: Task) {
    this.allTasks.splice(this.allTasks.indexOf(task), 1);
  }
}
