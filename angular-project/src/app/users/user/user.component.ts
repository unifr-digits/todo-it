import { Component, Output, EventEmitter } from '@angular/core';

import { User } from '../user';
import { USERS } from '../mock-users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  users = USERS;

  selectedUser?: User;
  onSelect(user: User): void {
    this.selectedUser = user;
  }
}
