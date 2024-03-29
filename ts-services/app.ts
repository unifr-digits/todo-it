import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import http from "http";
import https from "https";
import { environment } from "./environments/environment.prod";

import * as UserService from "./routes/user_service";
import * as TaskService from "./routes/task_service";
import * as ProjectService from "./routes/project_service";
import * as TeamService from "./routes/team_service";

const SERVICE_PORT = environment.service_port;

class Services {

    private app;
    private server;

    private credentials = {
        key: fs.readFileSync(environment.tls_key_file, 'utf8'), 
        cert: fs.readFileSync(environment.tls_cert_file, 'utf8')
    };
    
    constructor() {
        this.app = express();

        this.app.use(bodyParser.json());

        var corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
          }
        this.app.use(cors(corsOptions));

        this.app.use(`/`, UserService.router);
        this.app.use(`/`, TaskService.router);
        this.app.use(`/`, ProjectService.router);
        this.app.use(`/`, TeamService.router)
        
        //this.server = http.createServer(this.app);
        // uncomment to use https:
        this.server = https.createServer(this.credentials, this.app);
    }

    startServer(port: number) {
        this.server.listen(port, () => {
            console.log(`Server listening for requests on port ${SERVICE_PORT}`);
        });        
    }

}

let services = new Services();
services.startServer(SERVICE_PORT);
