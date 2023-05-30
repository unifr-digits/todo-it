import { Injectable, Input } from '@angular/core';
import { Observable, from } from 'rxjs';
import Dexie from 'dexie';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends Dexie {
  users!: Dexie.Table<User, number>;

  @Input() task!: User;

  constructor() {
    super('users-db');
    this.version(1).stores({
      users: '++user_id, firstName, lastName, userName, emailAddress, password',
    });
  }

  getUsers(): Observable<User[]> {
    const users = from(this.users.toArray());
    return users;
  }

  addUser(firstName: string, lastName: string, userName: string, emailAddress: string, password: string) {
    this.users.add({
      firstName,
      lastName,
      userName,
      emailAddress,
      password,
    });
  }

  async updateUsers() {
    this.users = await this.users;
  }
}
