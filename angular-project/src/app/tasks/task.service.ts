import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import Dexie from 'dexie';

import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService extends Dexie {
  tasks!: Dexie.Table<Task, string>;

  @Input() task!: Task;

  constructor() {
    super('tasks-db');
    this.version(1).stores({
      tasks: 'id, name,desc, date,modules,done,assignedUsers,assignedProjects',
    });
    this.tasks.bulkAdd(TASKS);
  }

  getTasks(): Observable<Dexie.Table<Task, string>> {
    const tasks = of(this.tasks);
    return tasks;
  }

  addTask(task: Task) {
    const min = 1;
    const max = 100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    task.id = randomInt;
    task.done = false;
    this.tasks.add({
      name: task.name,
      desc: task.desc,
      id: task.id,
      date: task.date,
      modules: task.modules,
      done: task.done,
      assignedUsers: task.assignedUsers,
      assignedProjects: task.assignedProjects,
    });
  }

  deleteTask(task: Task) {
    this.tasks.delete(task.name);
  }

  async updateTasks() {
    this.tasks = await this.tasks;
  }
}
