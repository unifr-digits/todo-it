import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { Task } from '../task';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  title = "Project Management"
  projects: Project[];

  constructor(private projectService: ProjectService) {
    this.projects = projectService.projects;
  }

  addProject(name: string, desc: string, modules:string[]) {
    this.projectService.addProject(name, desc, modules);
    this.projects = this.projectService.projects;
  }
}
