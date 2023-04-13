import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title= "ToDo-it"
  tasks: Task[];

  constructor(private taskService: TaskService) {
    this.tasks = taskService.tasks;
  }

  addTask(name: string, desc: string, id: number, date: string, modules: string[],assignedUsers: string[], assignedProjects: string[]) {
    this.taskService.addTask(name, desc, id, date, modules,assignedUsers ,assignedProjects);
    this.tasks = this.taskService.tasks;
  }

  remove(task: Task) {
    this.taskService.deleteTask(task);
    this.tasks = this.taskService.tasks;
  }
}