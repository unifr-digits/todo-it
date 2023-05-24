import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import Dexie from 'dexie';

import { Task } from './task';
import { User } from '../users/user';
import { Project } from '../projects/project';

@Injectable({ providedIn: 'root' })
export class TaskService extends Dexie {
  tasks!: Dexie.Table<Task, number>;

  @Input() task!: Task;

  constructor() {
    super('tasks-db');
    this.version(1).stores({
      tasks: '++task_id, name, desc, date, done, assignedUsers, assignedProjects',
    });
  }

  getTasks(): Observable<Dexie.Table<Task, number>> {
    const tasks = of(this.tasks);
    return tasks;
  }

  addTask(name: string, desc: string, date: string, done: boolean, assignedUsers: User[], assignedProjects: Project[]) {
    this.tasks.add({
      name,
      desc,
      date,
      done,
      assignedUsers,
      assignedProjects,
    });
  }

  deleteTask(task: Task) {
    this.tasks.delete(task?.task_id!);
  }

  async updateTasks() {
    this.tasks = await this.tasks;
  }
}
