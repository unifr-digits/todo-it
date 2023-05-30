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
      users: '++user_id, name, email',
    });
  }

  getUsers(): Observable<User[]> {
    const users = from(this.users.toArray());
    return users;
  }

  addUser(name: string, email: string) {
    this.users.add({
      name,
      email,
    });
  }

  async updateUsers() {
    this.users = await this.users;
  }
}
