import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  allUsers = [
    {firstName:"John", lastName:"Twick", userName:"Jtwick", emailAdress:"John.twick@hotmail.com", password:"1234",usedDevices:["tablet","phone"]}
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