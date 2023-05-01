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
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.projectService.getProjects().subscribe((projects) => (this.projects = projects));

    this.teamForm = this.fb.group({
      name: [this.data?.team?.name, [Validators.required]],
      desc: [this.data?.team?.desc, [Validators.required]],
      members: [this.data?.team?.members],
      modules: [this.data?.team?.modules],
      tasks: [this.data?.team?.tasks],
      projects: [this.data?.team?.projects],
    });
  }

  save() {
    if (this.teamForm.invalid) {
      return;
    }

    const { name, desc, members, modules, tasks, projects } = this.teamForm.value;

    const team: Team = {
      name,
      desc,
      id: this.data.team.id,
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
