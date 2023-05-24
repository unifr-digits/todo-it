import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Project } from './project';
import { Task } from '../tasks/task';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends Dexie {
  projects!: Dexie.Table<Project, number>;

  constructor() {
    super('projects-db');
    this.version(1).stores({
      projects: '++project_id, name, desc, tasks',
    });
  }

  getProjects(): Observable<Dexie.Table<Project, number>> {
    const projects = of(this.projects);
    return projects;
  }

  addProject(name: string, desc: string, tasks: Task[]) {
    this.projects.add({
      name,
      desc,
      tasks,
    });
  }

  deleteProject(project: Project) {
    this.projects.delete(project?.project_id!);
  }
}
