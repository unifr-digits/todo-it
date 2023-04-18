import { Injectable } from '@angular/core';

import { Project } from './project';
import { PROJECTS } from './mock-projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  allProjects = PROJECTS;

  get projects() {
    return this.allProjects;
  }

  addProject(name: string, desc: string, modules: string[]) {
    const min = 1;
    const max = 1000;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    const newProject: Project = {
      name,
      desc,
      id: randomInt,
      modules,
      tasks: [],
    };
    this.allProjects.unshift(newProject);
  }

  deleteProject(project: Project) {
    this.allProjects.splice(this.allProjects.indexOf(project), 1);
  }
}
