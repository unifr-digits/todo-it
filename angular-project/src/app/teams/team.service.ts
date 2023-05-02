import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Team } from './team';
import { User } from '../users/user';
import { Task } from '../tasks/task';
import { Project } from '../projects/project';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class TeamService extends Dexie {
  teams!: Dexie.Table<Team, string>

  constructor() {
    super('teams-db');
    this.version(1).stores({
      teams: 'name,desc,id,members,modules,tasks,projects'
    });
  }

  getTeams(): Observable<Dexie.Table<Team, string>> {
    const teams = of(this.teams);
    return teams;
  }

  addTeam(name: string, desc: string, members: User[], modules: string[], tasks: Task[], projects: Project[]) {
    const min = 1;
    const max = 100;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    this.teams.add({
      name:name,
      desc:desc,
      id: randomInt,
      members:members,
      modules:modules,
      tasks:tasks,
      projects:projects,
    });
  }

  deleteTeam(team: Team) {
    this.teams.delete(team.name);
  }
}
