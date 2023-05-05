import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Team } from './team';
import { TEAMS } from './mock-teams';
import { User } from '../users/user';
import { Task } from '../tasks/task';
import { Project } from '../projects/project';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class TeamService extends Dexie {
  teams!: Dexie.Table<Team, number>;

  constructor() {
    super('teams-db');
    this.version(1).stores({
      teams: 'id++, name,desc,members,modules,tasks,projects',
    });
    this.teams.bulkAdd(TEAMS);
  }

  getTeams(): Observable<Dexie.Table<Team, number>> {
    const teams = of(this.teams);
    return teams;
  }

  addTeam(name: string, desc: string, members: User[], modules: string[], tasks: Task[], projects: Project[]) {
    this.teams.add({
      name,
      desc,
      members,
      modules,
      tasks,
      projects,
    });
  }

  deleteTeam(team: Team) {
    this.teams.delete(team?.id!);
  }
}
