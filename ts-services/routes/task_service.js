"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const task_1 = require("../model/task");
const user_1 = require("../model/user");
const task_data_controller_1 = require("../control/task_data_controller");
const PATH_PREFIX = '/api/v1/';
let router = express_1.default.Router();
exports.router = router;
// API v1
// Post a new task to the collection resource "tasks"
// POST request
router.post(PATH_PREFIX + "tasks", (req, res) => {
    const { task_id, name, done } = req.body;
    console.log(req.method, req.url, task_id, name, done);
    console.log(req.headers);
    // authenticate with token sent along in the header
    let token_data;
    try {
        const token = req.headers["x-access-token"];
        token_data = user_1.User.verifyJwtToken(token);
        console.log(token_data.user_id);
    }
    catch (error) {
        res.status(403).send("Authentication failed");
        return;
    }
    if (!(task_id != null && name != null && done != null)) {
        // response with status code 400 ("bad request")
        res.status(400).send("Missing input values");
        return;
    }
    let task = new task_1.Task();
    task.task_id = task_id;
    task.name = name;
    task.done = done;
    task.user_id = token_data.user_id;
    // respond with status code 201 ("created")
    let prom = task_data_controller_1.TaskDataController.insertTask(token_data.user_id, task);
    prom.then(result => {
        res.status(201).send();
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});
// Get the collection resource "tasks"
// GET request
router.get(PATH_PREFIX + "tasks", (req, res) => {
    console.log(req.method, req.url);
    // authenticate with token sent along in the header
    let token_data;
    try {
        const token = req.headers["x-access-token"];
        token_data = user_1.User.verifyJwtToken(token);
    }
    catch (error) {
        res.status(403).send("Authentication failed");
        return;
    }
    let prom = task_data_controller_1.TaskDataController.selectTasks(token_data.user_id);
    prom.then(tasks => {
        console.log(tasks);
        res.status(200).json(tasks);
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});
// Get an task, a singleton resource, from collection resource "tasks"
// GET request
router.get(PATH_PREFIX + "tasks/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.method, req.url, id);
    let token_data;
    try {
        const token = req.headers["x-access-token"];
        token_data = user_1.User.verifyJwtToken(token);
    }
    catch (error) {
        res.status(403).send("Authentication failed");
        return;
    }
    if (!id) {
        res.status(400).send("Missing input values");
        return;
    }
    let prom = task_data_controller_1.TaskDataController.selectTask(token_data.user_id, id);
    prom.then(task => {
        res.status(200).json(task);
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});
// Update singleton resource
// PUT request
router.put(PATH_PREFIX + "tasks/:id", (req, res) => {
    const { id } = req.params;
    const { task_id, name, done } = req.body;
    console.log(req.method, req.url, task_id, name, done);
    console.log(req.headers);
    let token_data;
    try {
        const token = req.headers["x-access-token"];
        token_data = user_1.User.verifyJwtToken(token);
    }
    catch (error) {
        res.status(403).send("Authentication failed");
        return;
    }
    if (!(task_id != null && name != null && done != null)) {
        res.status(400).send("Missing input values");
        return;
    }
    let task = new task_1.Task();
    task.task_id = task_id;
    task.name = name;
    task.done = done;
    task.user_id = token_data.user_id;
    let prom = task_data_controller_1.TaskDataController.updateTask(token_data.user_id, task);
    prom.then(result => {
        res.status(200).send();
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});
// Delete singleton resource
// DELETE request
router.delete(PATH_PREFIX + "tasks/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.method, req.url, id);
    let token_data;
    try {
        const token = req.headers["x-access-token"];
        token_data = user_1.User.verifyJwtToken(token);
    }
    catch (error) {
        res.status(403).send("Authentication failed");
        return;
    }
    if (!id) {
        res.status(400).send("Missing input values");
        return;
    }
    let prom = task_data_controller_1.TaskDataController.deleteTask(token_data.user_id, id);
    prom.then(result => {
        res.status(200).send();
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});
