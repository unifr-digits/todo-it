import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
})
export class UserSignupComponent implements OnInit {
  public formError: string = '';

  public pageContent = {
    header: {
      title: 'Create account',
      strapline: '',
    },
    sidebar: '',
  };

  constructor(private router: Router, private userAuthService: UserAuthService) {}

  public credentials = {
    email: '',
    password: '',
    name: '',
  };

  ngOnInit() {}

  public onSignupSubmit(): void {
    this.formError = '';
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required for signing up';
    } else {
      this.userAuthService
        .signup(this.credentials.email, this.credentials.password, this.credentials.name)
        .then(() => this.router.navigateByUrl('/login'))
        .catch((error) => {
          this.formError = error.message;
        });
    }
  }
}
