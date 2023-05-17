import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/projects/project';
import { ProjectService } from 'src/app/projects/project.service';
import { Task } from 'src/app/tasks/task';
import { TaskService } from 'src/app/tasks/task.service';
import { User } from 'src/app/users/user';
import { UserService } from 'src/app/users/user.service';
import { Team } from '../team';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './teamDialog.component.html',
  styleUrls: ['./teamDialog.component.css'],
})
export class TeamDialogComponent implements OnInit {
  teamForm!: FormGroup;
  members: User[] = [];
  tasks: Task[] = [];
  projects: Project[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { team: Team; tasks: Task[]; users: User[]; projects: Project[] }
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((members) => (this.members = members));
    this.updateTasks();
    this.updateProjects();

    this.teamForm = this.fb.group({
      name: [this.data?.team?.name, [Validators.required]],
      description: [this.data?.team?.description, [Validators.required]],
      members: [this.data?.team?.members],
      modules: [this.data?.team?.modules],
      tasks: [this.data?.team?.tasks],
      projects: [this.data?.team?.projects],
    });
  }
  async updateTasks() {
    this.tasks = await this.taskService.tasks.toArray();
  }
  async updateProjects() {
    this.projects = await this.projectService.projects.toArray();
  }

  save() {
    if (this.teamForm.invalid) {
      return;
    }

    const { name, description, members, modules, tasks, projects } = this.teamForm.value;

    const team: Team = {
      name,
      description,
      team_id: this.data.team.team_id,
      members,
      modules,
      tasks,
      projects,
    };
    console.log(projects);
    this.dialogRef.close(team);
  }

  close() {
    this.dialogRef.close();
  }
}
