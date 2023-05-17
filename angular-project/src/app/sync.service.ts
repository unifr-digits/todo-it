import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { TaskService } from './tasks/task.service';
import { TeamService } from './teams/team.service';
import { UserAuthService } from './user-auth.service';
import { Task } from './tasks/task';
import { Team } from './teams/team';
import { ProjectService } from './projects/project.service';
import { Project } from './projects/project';

const API_BASE_URL = "https://127.0.0.1:52439/api/v1/";

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private subject = new Subject<void>();
  onSyncFinished: Observable<void> = this.subject;

  constructor(
    private readonly taskService: TaskService,
    private readonly teamService: TeamService,
    private readonly projectService: ProjectService,
    private readonly userAuthService: UserAuthService,
    private readonly httpClient: HttpClient) {}

  async sync() : Promise<string> {

    const json_web_token = UserAuthService.getJwt();

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': json_web_token
      }),
      responseType: 'json',
    };

    let errorMessage = "";
    errorMessage = await this.sendPostRequests(httpOptions);
    errorMessage = await this.sendGetRequest(httpOptions);

    let statusMessage = this.getStatusMessage(errorMessage);

    return statusMessage;
  }

  async sendPostRequests(httpOptions: any) : Promise<string> {

    const tasks = await this.taskService.tasks.toArray();
    const teams = await this.teamService.teams.toArray();
    const projects = await this.projectService.projects.toArray();

    console.log("Sending POST requests ...");
    let errorMessage = "";

    for (let task of tasks) {
      let object = { "task_id": task.task_id, "name": task.name, "done": task.done}
      console.log(object);

      try {
        let response: any;
        response = await this.httpClient.post(API_BASE_URL + 'tasks', object, httpOptions).toPromise();

      } catch(error) {
        // when trying to add an already existing task, a duplicate key error occurs - issue PUT request in this case
        if (error.error.startsWith("error: duplicate key value")) {
          await this.httpClient.put(API_BASE_URL + 'tasks/' + task.task_id, object, httpOptions).toPromise();
        } else {
          errorMessage = error.error;
          console.log(error.error);
        }
      }
    }

    for (let team of teams) {
      let object = { "team_id": team.team_id, "name": team.name, "description": team.description }
      console.log(object);

      try {
        let response: any;
        response = await this.httpClient.post(API_BASE_URL + 'teams', object, httpOptions).toPromise();

      } catch(error) {
        // when trying to add an already existing team, a duplicate key error occurs - issue PUT request in this case
        if (error.error.startsWith("error: duplicate key value")) {
          await this.httpClient.put(API_BASE_URL + 'teams/' + team.team_id, object, httpOptions).toPromise();
        } else {
          errorMessage = error.error;
          console.log(error.error);
        }
      }
    }

      for (let project of projects) {
        let object = { "project_id": project.project_id, "name": project.name}
        console.log(object);

        try {
          let response: any;
          response = await this.httpClient.post(API_BASE_URL + 'projects', object, httpOptions).toPromise();

        } catch(error) {
          // when trying to add an already existing project, a duplicate key error occurs - issue PUT request in this case
          if (error.error.startsWith("error: duplicate key value")) {
            await this.httpClient.put(API_BASE_URL + 'projects/' + project.project_id, object, httpOptions).toPromise();
          } else {
            errorMessage = error.error;
            console.log(error.error);
          }
        }
      }

      return errorMessage;
    }

    async sendGetRequest(httpOptions: any) : Promise<string> {

    console.log("Sending GET request ...");
    let errorMessage = "";

    try {

      let newTasks: any;
      newTasks = await this.httpClient.get<Task[]>(API_BASE_URL + 'tasks', httpOptions).toPromise();

      let newProjects: any;
      newProjects = await this.httpClient.get<Project[]>(API_BASE_URL + 'projects', httpOptions).toPromise();

      let newTeams: any;
      newTeams = await this.httpClient.get<Team[]>(API_BASE_URL + 'teams', httpOptions).toPromise();

      console.log(newTasks);
      this.taskService.tasks.bulkAdd(newTasks);

      console.log(newProjects);
      this.projectService.projects.bulkAdd(newProjects);

      console.log(newTeams);
      this.teamService.teams.bulkAdd(newTeams);

      this.subject.next();

    } catch(error) {
      errorMessage = error.error;
      console.log(error);
    }

    return errorMessage;
  }

  getStatusMessage(errorMessage: string) : string{

    let date = new Date();
    let timestamp = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0');

    let statusMessage = "";
    if (!errorMessage) {
      statusMessage = timestamp + " " + "synchronized";
    } else {
      statusMessage = timestamp + " " + errorMessage;
    }
    return statusMessage;
  }

}
