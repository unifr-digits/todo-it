import {ToDo} from "./todo";
import {Project} from "./project";
export class User {
    firstName: string;
    lastName: string;
    userName: string;
    emailAdress: string;
    password: string;
    usedDevices: string[];

    constructor(
        firstName: string,
        lastName: string,
        userName: string,
        emailAdress: string,
        password: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.emailAdress = emailAdress;
        this.password = password;
        this.usedDevices = [];
    }
    setName(firstName: string, lastName: string): void {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    setEmailAdress(emailAdress: string): void {
        this.emailAdress = emailAdress;
    }
    setusedDevices(usedDevices: string[]): void {
        this.usedDevices = usedDevices;
    }
    logIn(userName: string, password: string): void {
        if (this.userName === userName && this.password === password) {
            console.log(`logged in as ${this.userName}`);
        } else {
            console.log(`Incorrect username or password!`);
        }
    }
    logOut(): void {
        console.log(`logged out`);
    }
    createToDo(
        name: string,
        description: string,
        toDoID: number,
        finishDate: Date,
        addedModuleList: string[],
        isDone: boolean
    ) {
        var newToDo = new ToDo(name, description, toDoID, finishDate, addedModuleList, isDone);
        console.log(
            `new To-Do created with name: ${newToDo.name} and description: ${newToDo.description}. To be finished by ${newToDo.finishDate}.`
        );
        return newToDo;
    }
    completeToDo(toDo: ToDo) {
        toDo.isDone = true;
    }
    createTeam(): void {
        console.log("Teams are not yet implemented!");
    }
    createProject(
        name: string,
        description: string,
        projectID: number,
        addedModuleList: string[],
        toDoList: ToDo[]
    ) {
        var newProject = new Project(name, description, projectID, addedModuleList, toDoList);
        console.log(
            `new project created with name: ${newProject.name} and description: ${newProject.description}. Contains the To-Do's: ${newProject.toDoList}`
        );
        return newProject;
    }
    addModule(): void {
        console.log("Modules are not yet implemented!");
    }
    viewToDo(project: Project): void {
        console.log("The ToDos in this project are:");
        let projectToDoList = project.toDoList;
        for (let index = 0; index < projectToDoList.length; index++) {
            console.log(projectToDoList[index]);
        }
    }
    filterToDo(): void {
        console.log("Filter are not yet implemented!");
    }
}
