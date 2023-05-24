import { Component, Input } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  @Input() user?: User;

  setName(firstName: string, lastName: string): void {
    if (this.user == null) {
      return;
    }
    this.user.firstName = firstName;
    this.user.lastName = lastName;
  }

  setEmailAddress(emailAddress: string): void {
    if (this.user == null) {
      return;
    }
    this.user.emailAddress = emailAddress;
  }
}
