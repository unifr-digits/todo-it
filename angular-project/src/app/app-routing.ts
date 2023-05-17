import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './users/user/user.component';
import { TeamComponent } from './teams/team/team.component';
import { TaskComponent } from './tasks/task/task.component';
import { ProjectComponent } from './projects/project/project.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: AppComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'signup', component: UserSignupComponent },
      { path: 'login', component: UserLoginComponent },
    ]
  },
  // the components for the app need their own route with navigation bar
  { path: 'app', component: NavbarComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'users', component: UserComponent },
      { path: 'teams', component: TeamComponent },
      { path: 'tasks', component: TaskComponent },
      { path: 'projects', component: ProjectComponent },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
