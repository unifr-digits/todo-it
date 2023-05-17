"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDataController = void 0;
const task_1 = require("../model/task");
const data_access_controller_1 = require("./data_access_controller");
class TaskDataController extends data_access_controller_1.DataAccessController {
    static insertTask(user_id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("INSERT INTO tasks (task_id, name, done, user_id) VALUES ($1, $2, $3, $4)", [task.task_id, task.name, task.done, user_id]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
    static selectTasks(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = [];
            let results = yield data_access_controller_1.DataAccessController.pool.query("SELECT task_id, name, done FROM tasks WHERE user_id = $1", 
            // depending on data volume, only id or e.g. name column should be selected
            [user_id]);
            // return result, ID is unique
            if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
                for (let row of results.rows) {
                    let task = new task_1.Task();
                    task.task_id = row.task_id;
                    task.name = row.name;
                    task.done = row.done;
                    tasks.push(task);
                }
                return tasks;
            }
            throw new Error("No tasks for user found");
        });
    }
    static selectTask(user_id, task_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("SELECT task_id, name, done FROM tasks WHERE user_id = $1 and id = $2", [user_id, task_id]);
            // return result, ID is unique
            if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
                let task = new task_1.Task();
                task.task_id = results.rows[0].task_id;
                task.name = results.rows[0].name;
                task.done = results.rows[0].done;
                return task;
            }
            throw new Error("task not found");
        });
    }
    static updateTask(user_id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("UPDATE tasks SET name = $1, done = $2 WHERE user_id = $3 and task_id = $4", [task.name, task.done, user_id, task.task_id]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
    static deleteTask(user_id, task_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("DELETE FROM tasks WHERE user_id = $1 and task_id = $2", [user_id, task_id]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
}
exports.TaskDataController = TaskDataController;
