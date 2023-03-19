 export class ToDo {
    name: string;
    description: string;
    toDoID: number;
    finishDate: Date;
    addedModuleList: string[];
    isDone: boolean;

    constructor(name:string,description:string,toDoID:number,finishDate:Date,addedModuleList:string[],isDone:boolean){
        this.name = name;
        this.description = description;
        this.toDoID = toDoID;
        this.finishDate = finishDate;
        this.addedModuleList = addedModuleList;
        this.isDone = isDone; 
    }
}