import { Component } from '@angular/core';
import { Task } from './tasks/task';
import { User } from './users/user';
import { Project } from './projects/project';
import { TaskService } from './tasks/task.service';
import { UserService } from './users/user.service';
import { ProjectService } from './projects/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title= "ToDo-it"
  tasks: Task[];
  users: User[] = [];
  assignedProjects: Project[];

  constructor(private taskService: TaskService, private userService: UserService, private projectService: ProjectService) {
    this.tasks = taskService.tasks;
    this.assignedProjects = projectService.projects;
  }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  addTask(name: string, desc: string, date: string, modules: string[],users: User[], assignedProjects: Project[]) {
    this.taskService.addTask(name, desc, date, modules,users ,assignedProjects);
    this.tasks = this.taskService.tasks;
  }

  addUser(firstName: string,lastName:string, userName:string, emailAdress:string, password:string, usedDevices:string[]) {
    this.userService.addUser(firstName,lastName,userName,emailAdress,password,usedDevices);
  }

  addProject(name: string, desc: string, modules:string[]){
    this.projectService.addProject(name,desc,modules);
    this.assignedProjects = this.projectService.projects;
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task);
    this.tasks = this.taskService.tasks;
  }
  removeUser(user: User) {
    this.userService.deleteUser(user);
  }

  removeProject(project: Project) {
    this.projectService.deleteProject(project);
    this.assignedProjects = this.projectService.projects;
  }
}
