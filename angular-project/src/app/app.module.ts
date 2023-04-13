import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { TaskService } from './task.service';
import { ProjectService } from './project.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProjectComponent,
    UserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TaskService,
    ProjectService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
