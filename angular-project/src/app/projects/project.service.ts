import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project } from './project';
import { PROJECTS } from './mock-projects';
import { Task } from '../tasks/task';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends Dexie {
  projects!: Dexie.Table<Project, string>;

  constructor() {
    super('projects-db');
    this.version(1).stores({
      projects: 'id, name,desc, modules,tasks',
    });
    this.projects.bulkAdd(PROJECTS);
  }
  getProjects(): Observable<Dexie.Table<Project, string>> {
    const projects = of(this.projects);
    return projects;
  }

  addProject(name: string, desc: string, modules: string[], tasks: Task[]) {
    const min = 1;
    const max = 1000;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    const newProject: Project = {
      name,
      desc,
      id: randomInt,
      modules,
      tasks,
    };
    this.projects.add({
      name: newProject.name,
      desc: newProject.desc,
      id: newProject.id,
      modules: newProject.modules,
      tasks: newProject.tasks,
    });
  }

  deleteProject(project: Project) {
    this.projects.delete(project.name);
  }
}
