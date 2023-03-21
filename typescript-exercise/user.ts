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
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.emailAdress = "";
        this.password = "";
        this.usedDevices = [""];
    }
    setName(firstName:string,lastName:string):void{
        this.firstName = firstName;
        this.lastName = lastName;
    }
    setEmailAdress(emailAdress:string):void{
        this.emailAdress = emailAdress;
    }
    setusedDevices(usedDevices:string[]):void{
        this.usedDevices = usedDevices
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
        console.log(`new To-Do created with the name: ${newToDo.name} and the description: ${newToDo.description}, that has to be finished on ${newToDo.finishDate}`);
    }
    completeToDo(): void{

    }
    createTeam(): void{

    }
    createProject(name:string,description:string,projectID:number,addedModuleList:string[],toDoList:ToDo[]): void{
        var newProject = new Project(name,description,projectID,addedModuleList,toDoList)
        console.log(`new project created with the name ${newProject.name} and the description: ${newProject.description}, that contains the To-Do's: ${newProject.toDoList}`);
    }
    addModule(): void{

    }
    viewToDo(): void{

    }
    filterToDo(): void{

    }

}