import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  selectedUser?: User;
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  addUser(firstName: string, lastName: string, userName: string, emailAddress: string, password: string) {
    this.userService.addUser(firstName, lastName, userName, emailAddress, password);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
  }
}
