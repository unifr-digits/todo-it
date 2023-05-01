import { Injectable, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  allTasks = TASKS;

  @Input() task!: Task;

  getTasks(): Observable<Task[]> {
    const tasks = of(TASKS);
    return tasks;
  }

  addTask(task: Task) {
    const min = 1;
    const max = 100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    task.id = randomInt;
    task.done = false;
    this.allTasks.unshift(task);
  }

  deleteTask(task: Task) {
    this.allTasks.splice(this.allTasks.indexOf(task), 1);
  }
}
