import { Component, OnInit, Input} from '@angular/core';

import { Task } from '../task';
import { User } from '../../users/user';
import { Project } from '../../projects/project';

import { TaskService } from '../task.service';
import { UserService } from '../../users/user.service';
import { ProjectService } from '../../projects/project.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  projects: Project[] = [];

  @Input() task!: Task;
  editable = false

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

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask(name: string, desc: string, date: string, modules: string[], users: User[], projects: Project[]) {
    this.taskService.addTask(name, desc, date, modules, users, projects);
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  saveTask(task:Task,description: string) {
    if (!description) return;
    this.editable = false;
    task.desc = description;
  }
}
