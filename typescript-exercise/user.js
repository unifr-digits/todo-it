"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const todo_1 = require("./todo");
const project_1 = require("./project");
class User {
    constructor(firstName, lastName, userName, emailAdress, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.emailAdress = emailAdress;
        this.password = password;
        this.usedDevices = [];
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
        if (this.userName === userName && this.password === password) {
            console.log(`logged in as ${this.userName}`);
        }
        else {
            console.log(`Incorrect username or password!`);
        }
    }
    logOut() {
        console.log(`logged out`);
    }
    createToDo(name, description, toDoID, finishDate, addedModuleList, isDone) {
        var newToDo = new todo_1.ToDo(name, description, toDoID, finishDate, addedModuleList, isDone);
        console.log(`new To-Do created with name: ${newToDo.name} and description: ${newToDo.description}. To be finished by ${newToDo.finishDate}.`);
        return newToDo;
    }
    completeToDo(toDo) {
        toDo.isDone = true;
    }
    createTeam() {
        console.log("Teams are not yet implemented!");
    }
    createProject(name, description, projectID, addedModuleList, toDoList) {
        var newProject = new project_1.Project(name, description, projectID, addedModuleList, toDoList);
        console.log(`new project created with name: ${newProject.name} and description: ${newProject.description}. Contains the To-Do's: ${newProject.toDoList}`);
        return newProject;
    }
    addModule() {
        console.log("Modules are not yet implemented!");
    }
    viewToDo(project) {
        console.log("The ToDos in this project are:");
        let projectToDoList = project.toDoList;
        for (let index = 0; index < projectToDoList.length; index++) {
            console.log(projectToDoList[index]);
        }
    }
    filterToDo() {
        console.log("Filter are not yet implemented!");
    }
}
exports.User = User;
