import { Injectable } from '@angular/core';
import { Task } from './task';
import { User } from './user';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {}

  allTasks:Task[]= [
    {name:"Buy t-shirt",desc:"I need a black tshirt from H&M ",id:1,date:"2023-01-10",modules: [""] ,done: true, assignedUsers: [], assignedProjects: []},
    {name:"sysdev assignment 2",desc:"finish assignment 2 for sysdev course",id:2,date:"2023-04-06",modules: [""],done:false, assignedUsers: [], assignedProjects: [] },
    {name:"workout" ,desc:"20 min running session",id:3,date:"2023-01-10",modules: [""],done:false, assignedUsers: [], assignedProjects: []}
  ]

  get tasks(){
    return this.allTasks;
  }

  addTask(name: string, desc: string,date: string, modules: string[],assignedUsers:User[],assignedProjects:Project[]) {
    const min = 1;
    const max = 100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    this.allTasks.unshift({
      name,
      desc,
      id: randomInt,
      date,
      modules,
      done: false,
      assignedUsers,
      assignedProjects
    });
  }

  deleteTask(task: Task) {
    this.allTasks.splice(this.allTasks.indexOf(task), 1);
  }
}