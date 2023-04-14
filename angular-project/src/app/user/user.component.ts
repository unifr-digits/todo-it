import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  @Input() user!: User;
  @Output() remove = new EventEmitter<User>();

  saveUser(userName: string){
    if(!userName)return;
    this.user.userName = userName;
  }

}