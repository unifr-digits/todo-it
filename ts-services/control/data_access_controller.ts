import { Pool } from "pg";
import { environment } from "../environments/environment.prod";

export class DataAccessController {

    protected static pool = new Pool({
        user: environment.db_user,
        host: environment.db_host,
        database: environment.db_name,
        password: environment.db_pass,
        port: environment.db_port,
        statement_timeout: 2000
    });

    constructor() {
        DataAccessController.createDataSchema();
    }

    static async createDataSchema() : Promise<void> {
        let statements = [
            "CREATE TABLE IF NOT EXISTS users (user_id serial, email text UNIQUE, name text, password_hash text, PRIMARY KEY (user_id))",
            "CREATE TABLE IF NOT EXISTS tasks (task_id text, name text, done bool, user_id int, PRIMARY KEY (task_id), FOREIGN KEY (user_id) REFERENCES users(user_id))",
            "CREATE TABLE IF NOT EXISTS projects (project_id text, name text, user_id int, PRIMARY KEY (project_id), FOREIGN KEY (user_id) REFERENCES users(user_id))",
            "CREATE TABLE IF NOT EXISTS teams (team_id text, name text,description text, user_id int, PRIMARY KEY (team_id), FOREIGN KEY (user_id) REFERENCES users(user_id))"
        ];
        for (let s of statements) {
            let results = await DataAccessController.pool.query(s);
            if (typeof results.rows !== 'undefined') {
                return;
            }
            throw new Error("Empty result");
        }
    }

}
