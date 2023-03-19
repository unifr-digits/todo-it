"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
class Project {
    constructor(name, description, projectID, addedModuleList, toDoList) {
        this.name = name;
        this.description = description;
        this.projectID = projectID;
        this.addedModuleList = addedModuleList;
        this.toDoList = toDoList;
    }
}
exports.Project = Project;
