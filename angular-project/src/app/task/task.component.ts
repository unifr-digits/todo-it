import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() task!: Task; //task is always initialized and not undefined
  @Output() remove = new EventEmitter<Task>();// raise an event when there is data to share with app.component

  saveTask(description: string){
    if(!description)return;
    this.task.description = description;
  }
}
