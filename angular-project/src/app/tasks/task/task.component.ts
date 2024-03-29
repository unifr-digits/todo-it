import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../task';
import { User } from '../../users/user';
import { Project } from '../../projects/project';
import { TaskService } from '../task.service';
import { UserService } from '../../users/user.service';
import { ProjectService } from '../../projects/project.service';
import { TaskDialogComponent } from '../taskDialog/taskDialog.component';

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
  editable = false;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private dialog: MatDialog // Inject the MatDialog service
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => (this.users = users));
    this.updateTasks();
    this.updateProjects();
  }

  addTask(name: string, desc: string, date: string, users: User[], projects: Project[]) {
    this.taskService.addTask(name, desc, date, false, users, projects);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
    this.updateTasks();
  }

  saveTask(task: Task, description: string) {
    if (!description) return;
    this.editable = false;
    task.desc = description;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        task: this.task || { name: '', desc: '', date: '', assignedUsers: [], assignedProjects: [] },
        users: this.users,
        projects: this.projects,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { name, desc, date, assignedUsers, assignedProjects } = result;
        this.addTask(name, desc, date, assignedUsers, assignedProjects);
        this.updateTasks();
      }
    });
  }
  async updateTasks() {
    this.tasks = await this.taskService.tasks.toArray();
  }
  async updateProjects() {
    this.projects = await this.projectService.projects.toArray();
  }
}
