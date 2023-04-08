import { Component } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';

  allTasks = [
    {name:"Buy t-shirt",description:"I need a black tshirt from H&M ",toDoID:1,finishDate:"2023-01-10",addedModuleList: [""] ,isDone: true},
    {name:"sysdev assignment 2",description:"finish assignment 2 for sysdev course",toDoID:2,finishDate:"2023-04-06",addedModuleList: [""],isDone:false },
    {name:"workout" ,description:"20 min running session",toDoID:3,finishDate:"2023-01-10",addedModuleList: [""],isDone:false}
  ]
  get tasks(){
    return this.allTasks;
  }

  addTask(name:string,description:string,toDoID:number,finishDate:string,addedModuleList:string[] ){
    this.allTasks.unshift({
      name,
      description,
      toDoID,
      finishDate,
      addedModuleList,
      isDone: false
    });
  }

  remove(task: Task) {
    this.allTasks.splice(this.allTasks.indexOf(task), 1);
  }
}
