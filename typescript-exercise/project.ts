import {ToDo} from './todo';
export class Project {
    name: string;
    description: string;
    projectID: number;
    addedModuleList: string[];
    toDoList: ToDo[];

    constructor(name:string,description:string,projectID:number,addedModuleList:string[],toDoList:ToDo[]){
        this.name = name;
        this.description = description;
        this.projectID = projectID;
        this.addedModuleList = addedModuleList;
        this.toDoList = toDoList; 
    }
}