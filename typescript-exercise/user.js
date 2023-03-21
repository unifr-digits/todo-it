"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const todo_1 = require("./todo");
const project_1 = require("./project");
class User {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.emailAdress = "";
        this.password = "";
        this.usedDevices = [""];
    }
    setName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    setEmailAdress(emailAdress) {
        this.emailAdress = emailAdress;
    }
    setusedDevices(usedDevices) {
        this.usedDevices = usedDevices;
    }
    logIn(userName, password) {
        this.userName = userName;
        this.password = password;
        console.log(`logged in as ${this.userName}`);
    }
    logOut() {
        console.log(`logged out`);
    }
    createToDo(name, description, toDoID, finishDate, addedModuleList, isDone) {
        var newToDo = new todo_1.ToDo(name, description, toDoID, finishDate, addedModuleList, isDone);
        console.log(`new To-Do created with the name: ${newToDo.name} and the description: ${newToDo.description}, that has to be finished on ${newToDo.finishDate}`);
    }
    completeToDo() {
    }
    createTeam() {
    }
    createProject(name, description, projectID, addedModuleList, toDoList) {
        var newProject = new project_1.Project(name, description, projectID, addedModuleList, toDoList);
        console.log(`new project created with the name ${newProject.name} and the description: ${newProject.description}, that contains the To-Do's: ${newProject.toDoList}`);
    }
    addModule() {
    }
    viewToDo() {
    }
    filterToDo() {
    }
}
exports.User = User;
