import { Component, Input } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent {
  @Input() user?: User;

  setName(name: string, email: string): void {
    if (this.user == null) {
      return;
    }
    this.user.name = name;
    this.user.email = email;
  }

  setEmailAddress(email: string): void {
    if (this.user == null) {
      return;
    }
    this.user.email = email;
  }
}
