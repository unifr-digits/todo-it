import { ToDo } from './todo';
import { Project } from './project';
export class User {
    firstName: string;
    lastName: string;
    userName: string;
    emailAdress: string;
    password: string;
    usedDevices: string[];

    constructor(){
        this.firstName = "John";
        this.lastName = "Stevens";
        this.userName = "JoStev";
        this.emailAdress = "john.stevens@hotmail.com";
        this.password = "hello123";
        this.usedDevices = ["smartphone","table"];
    }
    logIn(userName:string, password:string): void{
        this.userName = userName;
        this.password = password;
        console.log(`logged in as ${this.userName}`);
    }
    logOut(): void{
        console.log(`logged out`);
    }
    createToDo(name:string,description:string,toDoID:number,finishDate:Date,addedModuleList:string[],isDone:boolean): void{
        var newToDo = new ToDo(name,description,toDoID,finishDate,addedModuleList,isDone)
        console.log(`new ${newToDo.name} To-Do created with the description: ${newToDo.description}, that has to be finished on ${newToDo.finishDate}`);
    }
    completeToDo(): void{

    }
    createTeam(): void{

    }
    createProject(name:string,description:string,projectID:number,addedModuleList:string[],toDoList:ToDo[]): void{
        var newProject = new Project(name,description,projectID,addedModuleList,toDoList)
        console.log(`new ${newProject.name} project created with the description: ${newProject.description}, that contains the To-Do's: ${newProject.toDoList}`);
    }
    addModule(): void{

    }
    viewToDo(): void{

    }
    filterToDo(): void{

    }
}