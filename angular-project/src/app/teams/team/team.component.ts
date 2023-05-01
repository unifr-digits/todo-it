import { Component, Input, OnInit } from '@angular/core';

import { Task } from 'src/app/tasks/task';
import { User } from '../../users/user';
import { Project } from '../../projects/project';
import { Team } from '../team';

import { TaskService } from 'src/app/tasks/task.service';
import { UserService } from '../../users/user.service';
import { ProjectService } from '../../projects/project.service';
import { TeamService } from '../team.service';
import { MatDialog } from '@angular/material/dialog';
import { TeamDialogComponent } from '../teamDialog/teamDialog.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  tasks: Task[] = [];
  members: User[] = [];
  projects: Project[] = [];
  teams: Team[] = [];
  @Input() team!: Team;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private teamService: TeamService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => (this.members = users));
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.projectService.getProjects().subscribe((projects) => (this.projects = projects));
    this.teamService.getTeams().subscribe((teams) => (this.teams = teams));
  }

  getTeams(): void {
    this.teamService.getTeams().subscribe((teams) => (this.teams = teams));
  }

  addTeam(name: string, desc: string, members: User[], modules: string[], tasks: Task[], projects: Project[]) {
    this.teamService.addTeam(name, desc, members, modules, tasks, projects);
  }
  deleteTeam(team: Team) {
    this.teamService.deleteTeam(team);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '500px',
      data: {
        team: this.team || { name: '', desc: '', member: [], modules: [], tasks: [], projects: [] },
        members: this.members,
        tasks: this.tasks,
        projects: this.projects,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { name, desc, members, modules, tasks, projects } = result;
        this.addTeam(name, desc, members, modules, tasks, projects);
      }
    });
  }
}
