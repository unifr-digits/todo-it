import { ITask } from "./itask";
import { IUser } from "./iuser";

export class Task implements ITask {

    task_id: string;
    name: string;
    done: boolean;
    user_id?: number;

    constructor() {
        this.task_id = "";
        this.name = "";
        this.done = false;
    }

}
