import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';
import { User } from './user';
import { Project } from './project';
import { UserService } from './user.service';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title= "ToDo-it"
  tasks: Task[];
  assignedUsers: User[];
  assignedProjects: Project[];

  constructor(private taskService: TaskService, private userService:UserService, private projectService: ProjectService) {
    this.tasks = taskService.tasks;
    this.assignedUsers = userService.users;
    this.assignedProjects = projectService.projects;
  }

  addTask(name: string, desc: string, id: number, date: string, modules: string[],assignedUsers: User[], assignedProjects: Project[]) {
    this.taskService.addTask(name, desc, id, date, modules,assignedUsers ,assignedProjects);
    this.tasks = this.taskService.tasks;
  }

  remove(task: Task) {
    this.taskService.deleteTask(task);
    this.tasks = this.taskService.tasks;
  }
}