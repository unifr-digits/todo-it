import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './tasks/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ProjectDialogComponent } from './projects/projectDialog/projectDialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProjectComponent,
    UserComponent,
    UserDetailComponent,
    TeamComponent,
    PageNotFoundComponent,
    NavbarComponent,
    DialogComponent,
    ProjectDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'app-user', component: UserComponent },
      { path: 'app-team', component: TeamComponent },
      { path: 'app-task', component: TaskComponent },
      { path: 'app-project', component: ProjectComponent },
      { path: '', redirectTo: '/app-task', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ]),
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [TaskService, ProjectService, UserService, TeamService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
