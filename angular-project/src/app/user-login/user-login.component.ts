import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  public formError = '';

  public pageContent = {
    header: {
      title: 'User Login',
      strapline: '',
    },
    sidebar: '',
  };

  constructor(private router: Router, private userAuthService: UserAuthService) {}

  public credentials = {
    email: '',
    password: '',
  };

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Please fill out the e-mail and password fields.';
    } else {
      this.userAuthService
        .login(this.credentials.email, this.credentials.password)
        .then(() => this.router.navigateByUrl('/app/tasks'))
        .catch((error) => {
          this.formError = error.message;
        });
    }
  }
}
