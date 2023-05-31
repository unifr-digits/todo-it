import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { TaskService } from './tasks/task.service';
import { TeamService } from './teams/team.service';
import { UserAuthService } from './user-auth.service';
import { Task } from './tasks/task';
import { Team } from './teams/team';
import { User } from './users/user';
import { ProjectService } from './projects/project.service';
import { UserService } from './users/user.service';
import { Project } from './projects/project';

const API_BASE_URL = 'https://127.0.0.1:52439/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private subject = new Subject<void>();
  onSyncFinished: Observable<void> = this.subject;

  constructor(
    private taskService: TaskService,
    private teamService: TeamService,
    private projectService: ProjectService,
    private userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly httpClient: HttpClient
  ) {}

  async sync(): Promise<string> {
    const json_web_token = UserAuthService.getJwt();

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': json_web_token,
      }),
      responseType: 'json',
    };

    let errorMessage = '';
    errorMessage = await this.sendPostRequests(httpOptions);
    errorMessage = await this.sendGetRequest(httpOptions);
    const statusMessage = this.getStatusMessage(errorMessage);

    return statusMessage;
  }

  async sendPostRequests(httpOptions: any): Promise<string> {
    const tasks = await this.taskService.tasks.toArray();
    const teams = await this.teamService.teams.toArray();
    const projects = await this.projectService.projects.toArray();

    console.log('Sending POST requests ...');
    let errorMessage = '';

    for (const task of tasks) {
      const object = { task_id: task.task_id, name: task.name, done: task.done };

      try {
        await this.httpClient.post(API_BASE_URL + 'tasks', object, httpOptions).toPromise();
      } catch (error) {
        // when trying to add an already existing task, a duplicate key error occurs - issue PUT request in this case
        if (error.error.startsWith('error: duplicate key value')) {
          await this.httpClient.put(API_BASE_URL + 'tasks/' + task.task_id, object, httpOptions).toPromise();
        } else {
          errorMessage = error.error;
          console.log(error.error);
        }
      }
    }

    for (const team of teams) {
      const object = { team_id: team.team_id, name: team.name, description: team.description };

      try {
        await this.httpClient.post(API_BASE_URL + 'teams', object, httpOptions).toPromise();
      } catch (error) {
        // when trying to add an already existing team, a duplicate key error occurs - issue PUT request in this case
        if (error.error.startsWith('error: duplicate key value')) {
          await this.httpClient.put(API_BASE_URL + 'teams/' + team.team_id, object, httpOptions).toPromise();
        } else {
          errorMessage = error.error;
          console.log(error.error);
        }
      }
    }

    for (const project of projects) {
      const object = { project_id: project.project_id, name: project.name };

      try {
        await this.httpClient.post(API_BASE_URL + 'projects', object, httpOptions).toPromise();
      } catch (error) {
        // when trying to add an already existing project, a duplicate key error occurs - issue PUT request in this case
        if (error.error.startsWith('error: duplicate key value')) {
          await this.httpClient.put(API_BASE_URL + 'projects/' + project.project_id, object, httpOptions).toPromise();
        } else {
          errorMessage = error.error;
          console.log(error.error);
        }
      }
    }

    return errorMessage;
  }

  async sendGetRequest(httpOptions: any): Promise<string> {
    console.log('Sending GET request ...');
    let errorMessage = '';

    try {
      const newTasks: any = await this.httpClient.get<Task[]>(API_BASE_URL + 'tasks', httpOptions).toPromise();

      const newProjects: any = await this.httpClient.get<Project[]>(API_BASE_URL + 'projects', httpOptions).toPromise();

      const newTeams: any = await this.httpClient.get<Team[]>(API_BASE_URL + 'teams', httpOptions).toPromise();

      const newUsers: any = await this.httpClient.get<User[]>(API_BASE_URL + 'users', httpOptions).toPromise();

      this.taskService.tasks.bulkAdd(newTasks);

      this.projectService.projects.bulkAdd(newProjects);

      this.teamService.teams.bulkAdd(newTeams);

      this.userService.users.bulkAdd(newUsers);

      this.subject.next();
    } catch (error) {
      errorMessage = error.error;
      console.log(error);
    }

    return errorMessage;
  }

  getStatusMessage(errorMessage: string): string {
    const date = new Date();
    const timestamp =
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':' +
      date.getSeconds().toString().padStart(2, '0');

    let statusMessage = '';
    if (!errorMessage) {
      statusMessage = timestamp + ' ' + 'synchronized';
    } else {
      statusMessage = timestamp + ' ' + errorMessage;
    }
    return statusMessage;
  }
}
