import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskComponent } from './tasks/task/task.component';
import { ProjectComponent } from './projects/project/project.component';
import { UserComponent } from './users/user/user.component';
import { TaskService } from './tasks/task.service';
import { ProjectService } from './projects/project.service';
import { UserService } from './users/user.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { TeamComponent } from './teams/team/team.component';
import { TeamService } from './teams/team.service';

@NgModule({
  declarations: [AppComponent, TaskComponent, ProjectComponent, UserComponent, UserDetailComponent, TeamComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'app-user', component: UserComponent },
      { path: 'app-team', component: TeamComponent },
      { path: 'app-task', component: TaskComponent },
      { path: 'app-project', component: ProjectComponent },
      { path: '', redirectTo: '/app-task', pathMatch: 'full' },
    ]), FormsModule,
  ],
  providers: [TaskService, ProjectService, UserService, TeamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
