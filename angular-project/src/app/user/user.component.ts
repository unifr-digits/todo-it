import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  title = "User Management"
  users: User[];

  constructor(private userService: UserService) {
    this.users = userService.users;
  }

  addUser(firstName: string,lastName:string, userName:string, emailAdress:string, password:string, usedDevices:string[]) {
    this.userService.addUser(firstName,lastName,userName,emailAdress,password,usedDevices);
    this.users = this.userService.users;
  }
}