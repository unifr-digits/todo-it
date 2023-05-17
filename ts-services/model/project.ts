import { IProject } from "./iproject";


export class Project implements IProject {

    project_id: string;
    name: string;
    user_id?: number;

    constructor() {
        this.project_id = "";
        this.name = "";
    }

}