import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskComponent } from './tasks/task/task.component';
import { ProjectComponent } from './projects/project/project.component';
import { UserComponent } from './users/user/user.component';
import { TaskService } from './tasks/task.service';
import { ProjectService } from './projects/project.service';
import { UserService } from './users/user.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProjectComponent,
    UserComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TaskService,
    ProjectService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
