"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const todo_1 = require("./todo");
const project_1 = require("./project");
class User {
    constructor() {
        this.firstName = "John";
        this.lastName = "Stevens";
        this.userName = "JoStev";
        this.emailAdress = "john.stevens@hotmail.com";
        this.password = "hello123";
        this.usedDevices = ["smartphone", "table"];
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
        console.log(`new ${newToDo.name} To-Do created with the description: ${newToDo.description}, that has to be finished on ${newToDo.finishDate}`);
    }
    completeToDo() {
    }
    createTeam() {
    }
    createProject(name, description, projectID, addedModuleList, toDoList) {
        var newProject = new project_1.Project(name, description, projectID, addedModuleList, toDoList);
        console.log(`new ${newProject.name} project created with the description: ${newProject.description}, that contains the To-Do's: ${newProject.toDoList}`);
    }
    addModule() {
    }
    viewToDo() {
    }
    filterToDo() {
    }
}
exports.User = User;
