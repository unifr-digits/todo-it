import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./users/user/user.component";
import { TeamComponent } from "./teams/team/team.component";
import { TaskComponent } from "./tasks/task/task.component";
import { ProjectComponent } from "./projects/project/project.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NgModule } from "@angular/core";
import { UserSignupComponent } from "./user-signup/user-signup.component";
import { UserLoginComponent } from "./user-login/user-login.component";

const routes: Routes = [
    { path: 'app-user', component: UserComponent },
    { path: 'app-team', component: TeamComponent },
    { path: 'app-task', component: TaskComponent },
    { path: 'app-project', component: ProjectComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'login', component: UserLoginComponent },
    { path: '', redirectTo: '/app-task', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  