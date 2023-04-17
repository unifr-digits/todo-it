import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  allUsers = [
    {firstName:"David", lastName:"Gauch", userName:"GauchD", emailAdress:"david.gauch@unifr.ch", password:"1234",usedDevices:["tablet","phone"]},
    {firstName:"Mattias", lastName:"Duerrmeier", userName:"DuerrmeierM", emailAdress:"duerrmeier.mattias", password:"1234",usedDevices:["tablet","phone"]},
  ]

  get users(){
    return this.allUsers;
  }

  addUser( firstName: string,lastName:string, userName:string, emailAdress:string, password:string, usedDevices:string[]) {
    this.allUsers.unshift({
      firstName,
      lastName,
      userName,
      emailAdress,
      password,
      usedDevices
    });
  }
  deleteUser(user: User) {
    this.allUsers.splice(this.allUsers.indexOf(user), 1);
  }
  setName(firstName: string, lastName: string): void {
    firstName = firstName;
    lastName = lastName;
  }
  setEmailAdress(emailAdress: string): void {
      emailAdress = emailAdress;
  }
  setusedDevices(usedDevices: string[]): void {
      usedDevices = usedDevices;
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
