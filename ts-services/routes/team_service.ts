import express from "express";

import { ITeam } from "../model/iteam";
import { Team } from "../model/team";
import { User } from "../model/user";
import { TeamDataController } from "../control/team_data_controller";

const PATH_PREFIX = '/api/v1/';

let router = express.Router();

// API v1
// Post a new team to the collection resource "teams"
// POST request
router.post(PATH_PREFIX + "teams", (req, res) => {
    const { team_id, name, description } = req.body;
    console.log(req.method, req.url, team_id, name, description);
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

    if (!(team_id != null && name != null && description != null)) {
        // response with status code 400 ("bad request")
        res.status(400).send("Missing input values");
        return;
    }

    let team: ITeam = new Team();
    team.team_id = team_id;
    team.name = name;
    team.description = description;
    team.user_id = token_data.user_id;

    // respond with status code 201 ("created")
    let prom = TeamDataController.insertTeam(token_data.user_id, team);
    prom.then(result => {
        res.status(201).send();
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});

// Get the collection resource "teams"
// GET request
router.get(PATH_PREFIX + "teams", (req, res) => {
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

    let prom = TeamDataController.selectTeams(token_data.user_id);
    prom.then(teams => {
        console.log(teams);
        res.status(200).json(teams);
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});


// Get an team, a singleton resource, from collection resource "teams"
// GET request
router.get(PATH_PREFIX + "teams/:id", (req, res) => {
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
    let prom = TeamDataController.selectTeam(token_data.user_id, id);
    prom.then(team => {
        res.status(200).json(team);
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});

// Update singleton resource
// PUT request
router.put(PATH_PREFIX + "teams/:id", (req, res) => {
    const { id } = req.params;
    const {team_id, name, description } = req.body;
    console.log(req.method, req.url, team_id, name, description);
    console.log(req.headers);

    let token_data;
    try {
        const token = req.headers["x-access-token"] as string;
        token_data = User.verifyJwtToken(token);
    } catch(error) {
        res.status(403).send("Authentication failed");
        return;
    }

    if (!(team_id != null && name != null && description != null)) {
        res.status(400).send("Missing input values");
        return;
    }

    let team = new Team();
    team.team_id = team_id;
    team.name = name;
    team.description = description;
    team.user_id = token_data.user_id;

    let prom = TeamDataController.updateTeam(token_data.user_id, team);
    prom.then(result => {
        res.status(200).send()
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});

// Delete singleton resource
// DELETE request
router.delete(PATH_PREFIX + "teams/:id", (req, res) => {
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

    let prom = TeamDataController.deleteTeam(token_data.user_id, id);
    prom.then(result => {
        res.status(200).send();
    }).catch(error => {
        console.log(error);
        res.status(400).send(error.toString());
    });
});

export { router };
