"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDo = void 0;
class ToDo {
    constructor(name, description, toDoID, finishDate, addedModuleList, isDone) {
        this.name = name;
        this.description = description;
        this.toDoID = toDoID;
        this.finishDate = finishDate;
        this.addedModuleList = addedModuleList;
        this.isDone = isDone;
    }
}
exports.ToDo = ToDo;
