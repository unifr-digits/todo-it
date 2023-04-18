import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  @Input() project!: Project;
  @Output() remove = new EventEmitter<Project>();

  saveProject(desc: string) {
    if (!desc) return;
    this.project.desc = desc;
  }
}
