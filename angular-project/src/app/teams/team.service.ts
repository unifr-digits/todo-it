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
  teams!: Dexie.Table<Team, number>;

  constructor() {
    super('teams-db');
    this.version(1).stores({
      teams: '++team_id, name,description,members,tasks,projects',
    });
  }

  getTeams(): Observable<Dexie.Table<Team, number>> {
    const teams = of(this.teams);
    return teams;
  }

  addTeam(name: string, description: string, members: User[], tasks: Task[], projects: Project[]) {
    this.teams.add({
      name,
      description,
      members,
      tasks,
      projects,
    });
  }

  deleteTeam(team: Team) {
    this.teams.delete(team?.team_id);
  }
}
