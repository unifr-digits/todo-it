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
exports.DataAccessController = void 0;
const pg_1 = require("pg");
const environment_prod_1 = require("../environments/environment.prod");
class DataAccessController {
    constructor() {
        DataAccessController.createDataSchema();
    }
    static createDataSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            let statements = [
                "CREATE TABLE IF NOT EXISTS users (user_id serial, email text UNIQUE, name text, password_hash text, PRIMARY KEY (user_id))",
                "CREATE TABLE IF NOT EXISTS tasks (task_id uuid, name text, done bool, user_id int, PRIMARY KEY (task_id), FOREIGN KEY (user_id) REFERENCES users(user_id))"
            ];
            for (let s of statements) {
                let results = yield DataAccessController.pool.query(s);
                if (typeof results.rows !== 'undefined') {
                    return;
                }
                throw new Error("Empty result");
            }
        });
    }
}
DataAccessController.pool = new pg_1.Pool({
    user: environment_prod_1.environment.db_user,
    host: environment_prod_1.environment.db_host,
    database: environment_prod_1.environment.db_name,
    password: environment_prod_1.environment.db_pass,
    port: environment_prod_1.environment.db_port,
    statement_timeout: 2000
});
exports.DataAccessController = DataAccessController;
