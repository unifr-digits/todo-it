import { Component, OnInit } from '@angular/core';
import { Task } from './tasks/task';
import { User } from './users/user';
import { Project } from './projects/project';
import { TaskService } from './tasks/task.service';
import { UserService } from './users/user.service';
import { ProjectService } from './projects/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ToDo It';
  tasks: Task[] = [];
  users: User[] = [];
  projects: Project[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => (this.users = users));
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.projectService.getProjects().subscribe((projects) => (this.projects = projects));
  }

  addTask(name: string, desc: string, date: string, modules: string[], users: User[], projects: Project[]) {
    this.taskService.addTask(name, desc, date, modules, users, projects);
  }
}
