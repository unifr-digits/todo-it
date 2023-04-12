import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() {}

  allTasks = [
    {name:"Buy t-shirt",desc:"I need a black tshirt from H&M ",id:1,date:"2023-01-10",modules: [""] ,done: true},
    {name:"sysdev assignment 2",desc:"finish assignment 2 for sysdev course",id:2,date:"2023-04-06",modules: [""],done:false },
    {name:"workout" ,desc:"20 min running session",id:3,date:"2023-01-10",modules: [""],done:false}
  ]

  get tasks(){
    return this.allTasks;
  }

  addTask(name: string, desc: string, id: number, date: string, modules: string[]) {
    this.allTasks.unshift({
      name,
      desc,
      id,
      date,
      modules,
      done: false
    });
  }

  deleteTask(task: Task) {
    this.allTasks.splice(this.allTasks.indexOf(task), 1);
  }
}