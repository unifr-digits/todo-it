import { Component, Inject, OnInit } from '@angular/core';
import { Project } from '../project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/tasks/task';
import { TaskService } from 'src/app/tasks/task.service';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './projectDialog.component.html',
  styleUrls: ['./projectDialog.component.css'],
})
export class ProjectDialogComponent implements OnInit {
  projectForm!: FormGroup;
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project; tasks: Task[] }
  ) {}

  ngOnInit() {
    this.updateTasks();
    this.projectForm = this.fb.group({
      name: [this.data?.project?.name, [Validators.required]],
      desc: [this.data?.project?.desc, [Validators.required]],
      modules: [this.data?.project?.modules],
      tasks: [this.data?.project?.tasks],
    });
  }

  async updateTasks() {
    this.tasks = await this.taskService.tasks.toArray();
  }

  save() {
    if (this.projectForm.invalid) {
      return;
    }

    const { name, desc, modules, tasks } = this.projectForm.value;

    const project: Project = {
      name,
      desc,
      project_id: this.data.project.project_id,
      modules,
      tasks,
    };

    this.dialogRef.close(project);
  }

  close() {
    this.dialogRef.close();
  }
}
