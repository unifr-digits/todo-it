import { IUser } from "./iuser";

export interface ITask {
    task_id: string;
    name: string;
    done: boolean;
    user_id?: number;
}
