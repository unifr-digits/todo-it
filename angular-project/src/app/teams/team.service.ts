import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TEAMS } from './mock-teams';
import { Team } from './team';
import { User } from '../users/user';
import { Task } from '../tasks/task';
import { Project } from '../projects/project';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  allTeams = TEAMS;

  getTeams(): Observable<Team[]> {
    const teams = of(TEAMS);
    return teams;
  }

  addTeam(name: string, desc: string, members: User[], modules: string[], tasks: Task[], projects: Project[]) {
    const min = 1;
    const max = 100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    this.allTeams.unshift({
      name,
      desc,
      id: randomInt,
      members,
      modules,
      tasks,
      projects,
    });
  }

  deleteTeam(team: Team) {
    this.allTeams.splice(this.allTeams.indexOf(team), 1);
  }
}
