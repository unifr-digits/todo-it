import { Injectable } from '@angular/core';
import { Project } from './project';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() {}

  private allProjects: Project[] = [
    {
      name: "Project 1",
      desc: "This is the description of Project 1",
      id: 1,
      modules: ["Module 1", "Module 2"],
      tasks: [
        {name: "Task 1", desc: "This is the description of Task 1", id: 1,date:"2023-03-03",modules:[""],done:false,assignedUsers:[], assignedProjects:[]}
      ]
    },
    {
      name: "Project 2",
      desc: "This is the description of Project 2",
      id: 1,
      modules: ["Module 1", "Module 2"],
      tasks: [
        {name: "Task 1", desc: "This is the description of Task 1", id: 1,date:"2023-03-03",modules:[""],done:false,assignedUsers:[], assignedProjects:[]}
      ]
    }
  ];

  get projects(){
    return this.allProjects;
  }

  addProject(name: string, desc: string, modules:string[]) {
    const newProject: Project = {
      name,
      desc,
      id: this.allProjects.length + 1,
      modules,
      tasks: [],
    };
    this.allProjects.unshift(newProject);
  }

  deleteProject(project: Project) {
    this.allProjects.splice(this.allProjects.indexOf(project), 1);
  }
}