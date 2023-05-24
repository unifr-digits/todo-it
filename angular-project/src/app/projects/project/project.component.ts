import { Component, Input, OnInit } from '@angular/core';

import { Project } from '../project';
import { ProjectService } from '../project.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../projectDialog/projectDialog.component';
import { Task } from 'src/app/tasks/task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  tasks: Task[] = [];
  @Input() project!: Project;

  constructor(private projectService: ProjectService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateProjects();
  }

  addProject(name: string, desc: string, tasks: Task[]) {
    this.projectService.addProject(name, desc, tasks);
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project);
    this.updateProjects();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '500px',
      data: {
        project: this.project || { name: '', desc: '', tasks: [] },
        tasks: this.tasks,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { name, desc, tasks } = result;
        this.addProject(name, desc, tasks);
        this.updateProjects();
      }
    });
  }
  async updateProjects() {
    this.projects = await this.projectService.projects.toArray();
  }
}
