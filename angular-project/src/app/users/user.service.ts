import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  allUsers = [];

  getUsers(): Observable<User[]> {
    const users = of(this.allUsers);
    return users;
  }

  addUser(firstName: string, lastName: string, userName: string, emailAddress: string, password: string) {
    this.allUsers.unshift({
      firstName,
      lastName,
      userName,
      emailAddress,
      password,
    });
  }
  deleteUser(user: User) {
    this.allUsers.splice(this.allUsers.indexOf(user), 1);
  }

  logIn(userName: string, password: string): void {
    if (userName === userName && password === password) {
      console.log(`logged in as ${userName}`);
    } else {
      console.log(`Incorrect username or password!`);
    }
  }
  logOut(): void {
    console.log(`logged out`);
  }
}
