import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './tasks/task/task.component';
import { ProjectComponent } from './projects/project/project.component';
import { UserComponent } from './users/user/user.component';
import { TaskService } from './tasks/task.service';
import { ProjectService } from './projects/project.service';
import { UserService } from './users/user.service';

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
