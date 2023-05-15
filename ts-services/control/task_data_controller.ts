import { ITask } from "../model/itask";
import { Task } from "../model/task";
import { IUser } from "../model/iuser";
import { DataAccessController } from "./data_access_controller";

export class TaskDataController extends DataAccessController {

    static async insertTask(user_id: number, task: ITask) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "INSERT INTO tasks (task_id, name, done, user_id) VALUES ($1, $2, $3, $4)",
            [task.task_id, task.name, task.done, user_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }

    static async selectTasks(user_id: number) : Promise<ITask[]> {
        let tasks: Task[] = [];
        let results = await DataAccessController.pool.query(
            "SELECT task_id, name, done FROM tasks WHERE user_id = $1",
            // depending on data volume, only id or e.g. name column should be selected
            [user_id]
        );
        // return result, ID is unique
        if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
            for (let row of results.rows) {
                let task = new Task();
                task.task_id = row.tas_id;
                task.name = row.name;
                task.done = row.done;
                tasks.push(task);
            }
            return tasks;
        }
        throw new Error("No tasks for user found");
    }

    static async selectTask(user_id: number, task_id: string) : Promise<ITask> {
        let results = await DataAccessController.pool.query(
            "SELECT task_id, name, done FROM tasks WHERE user_id = $1 and id = $2",
            [user_id, task_id]
        );
        // return result, ID is unique
        if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
            let task = new Task();
            task.task_id = results.rows[0].id;
            task.name = results.rows[0].name;
            task.done = results.rows[0].done;
            return task;
        }
        throw new Error("task not found");
    }
    
    static async updateTask(user_id: number, task: ITask) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "UPDATE tasks SET name = $1, done = $2 WHERE user_id = $3 and task_id = $4",
            [task.name, task.done, user_id, task.task_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }

    static async deleteTask(user_id: number, task_id: string) : Promise<void> {
        let results = await DataAccessController.pool.query(
            "DELETE FROM tasks WHERE user_id = $1 and task_id = $2",
            [user_id, task_id]
        );
        if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
            return;
        }
        throw new Error("Empty result");
    }
}
