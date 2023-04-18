import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() remove = new EventEmitter<Task>();

  saveTask(description: string) {
    if (!description) return;
    this.task.desc = description;
  }
}
