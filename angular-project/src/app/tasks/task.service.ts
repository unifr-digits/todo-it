import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import Dexie from 'dexie';

import { Task } from './task';
import { User } from '../users/user';
import { Project } from '../projects/project';

import { TASKS } from './mock-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService extends Dexie {
  tasks!: Dexie.Table<Task, number>;

  @Input() task!: Task;

  constructor() {
    super('tasks-db');
    this.version(1).stores({
      tasks: '++id, name,desc, date, modules, done, assignedUsers, assignedProjects',
    });
    this.tasks.bulkAdd(TASKS);
  }

  getTasks(): Observable<Dexie.Table<Task, number>> {
    const tasks = of(this.tasks);
    return tasks;
  }

  addTask(
    name: string,
    desc: string,
    date: string,
    modules: string[],
    done: boolean,
    assignedUsers: User[],
    assignedProjects: Project[]
  ) {
    this.tasks.add({
      name,
      desc,
      date,
      modules,
      done,
      assignedUsers,
      assignedProjects,
    });
  }

  deleteTask(task: Task) {
    this.tasks.delete(task?.id!);
  }

  async updateTasks() {
    this.tasks = await this.tasks;
  }
}
