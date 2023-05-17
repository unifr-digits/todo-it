import express from "express";


import { Project } from "../model/project";
import { User } from "../model/user";
import { IProject } from "../model/iproject";
import { ProjectDataController } from "../control/project_data_controller";

const PATH_PREFIX = '/api/v1/';

let router = express.Router();

// API v1
// Post a new project to the collection resource "projects"
// POST request
router.post(PATH_PREFIX + "projects", (req, res) => {
    const { project_id, name} = req.body;
    console.log(req.method, req.url, project_id, name);
    console.log(req.headers);

    // authenticate with token sent along in the header
    let token_data;
    try {
        const token = req.headers["x-access-token"] as string;
        token_data = User.verifyJwtToken(token);
        console.log(token_data.user_id);
    } catch(error) {
        res.status(403).send("Authentication failed");
        return;
    }

    if (!(project_id != null && name != null)) {
        // response with status code 400 ("bad request")
        res.status(400).send("Missing input values");
        return;
    }

    let project: IProject= new Project();
    project.project_id = project_id;
    project.name = name;
    project.user_id = token_data.user_id;

    // respond with status code 201 ("created")
    let prom = ProjectDataController.insertProject(token_data.user_id, project);
    prom.then(result => {
        res.status(201).send();
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});

// Get the collection resource "projects"
// GET request
router.get(PATH_PREFIX + "projects", (req, res) => {
    console.log(req.method, req.url);
    
    // authenticate with token sent along in the header
    let token_data;
    try {
        const token = req.headers["x-access-token"] as string;
        token_data = User.verifyJwtToken(token);
    } catch(error) {
        res.status(403).send("Authentication failed");
        return;
    }

    let prom = ProjectDataController.selectProjects(token_data.user_id);
    prom.then(projects => {
        console.log(projects);
        res.status(200).json(projects);
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});


// Get an task, a singleton resource, from collection resource "projects"
// GET request
router.get(PATH_PREFIX + "projects/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.method, req.url, id);

    let token_data;
    try {
        const token = req.headers["x-access-token"] as string;
        token_data = User.verifyJwtToken(token);
    } catch(error) {
        res.status(403).send("Authentication failed");
        return;
    }

    if (!id) {
        res.status(400).send("Missing input values");
        return;
    }
    let prom = ProjectDataController.selectProject(token_data.user_id, id);
    prom.then(project => {
        res.status(200).json(project);
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});

// Update singleton resource
// PUT request
router.put(PATH_PREFIX + "projects/:id", (req, res) => {
    const { id } = req.params;
    const {project_id, name} = req.body;
    console.log(req.method, req.url, project_id, name);
    console.log(req.headers);

    let token_data;
    try {
        const token = req.headers["x-access-token"] as string;
        token_data = User.verifyJwtToken(token);
    } catch(error) {
        res.status(403).send("Authentication failed");
        return;
    }

    if (!(project_id != null && name != null )) {
        res.status(400).send("Missing input values");
        return;
    }

    let project = new Project();
    project.project_id = project_id;
    project.name = name;
    project.user_id = token_data.user_id;

    let prom = ProjectDataController.updateProject(token_data.user_id, project);
    prom.then(result => {
        res.status(200).send()
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});

// Delete singleton resource
// DELETE request
router.delete(PATH_PREFIX + "projects/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.method, req.url, id);

    let token_data;
    try {
        const token = req.headers["x-access-token"] as string;
        token_data = User.verifyJwtToken(token);
    } catch(error) {
        res.status(403).send("Authentication failed");
        return;
    }

    if (!id) {
        res.status(400).send("Missing input values");
        return;
    }

    let prom = ProjectDataController.deleteProject(token_data.user_id, id);
    prom.then(result => {
        res.status(200).send();
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});

export { router };
