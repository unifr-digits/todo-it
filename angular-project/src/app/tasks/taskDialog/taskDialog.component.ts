import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../../users/user';
import { Project } from '../../projects/project';
import { UserService } from '../../users/user.service';
import { ProjectService } from '../../projects/project.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './taskDialog.component.html',
  styleUrls: ['./taskDialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  taskForm!: FormGroup;
  assignedUsers: User[] = [];
  assignedProjects: Project[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {task: Task, users: User[], projects: Project[]}
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => (this.assignedUsers = users));
    this.projectService.getProjects().subscribe((projects) => (this.assignedProjects = projects));
  
    this.taskForm = this.fb.group({
      name: [this.data?.task?.name, [Validators.required]],
      desc: [this.data?.task?.desc, [Validators.required]],
      date: [this.data?.task?.date, [Validators.required]],
      modules: [this.data?.task?.modules],
      assignedUsers: [this.data?.task?.assignedUsers],
      assignedProjects: [this.data?.task?.assignedProjects]
    });
  }

  save() {
    if (this.taskForm.invalid) {
      return;
    }

    const { name, desc, date, modules, assignedUsers, assignedProjects } = this.taskForm.value;

    const task: Task = {
      name,
      desc,
      id: this.data.task.id,
      date,
      modules,
      done: false,
      assignedUsers,
      assignedProjects,
    };
    console.log(assignedProjects)

    this.dialogRef.close(task);
  }

  close() {
    this.dialogRef.close();
  }
}