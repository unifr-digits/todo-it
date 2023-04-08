export class Task {
    name: string;
    description: string;
    toDoID: number;
    finishDate: string;
    addedModuleList: string[];
    isDone: boolean;

    constructor(
        name: string,
        description: string,
        toDoID: number,
        finishDate: string,
        addedModuleList: string[],
        isDone: boolean
    ) {
        this.name = name;
        this.description = description;
        this.toDoID = 1;
        this.finishDate = finishDate;
        this.addedModuleList = addedModuleList;
        this.isDone = isDone;
    }
}