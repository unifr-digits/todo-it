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
exports.UserDataController = void 0;
const user_1 = require("../model/user");
const data_access_controller_1 = require("./data_access_controller");
class UserDataController extends data_access_controller_1.DataAccessController {
    static insertUser(user, password_hash) {
        return __awaiter(this, void 0, void 0, function* () {
            data_access_controller_1.DataAccessController.createDataSchema();
            let results = yield data_access_controller_1.DataAccessController.pool.query("INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3)", [user.email, user.name, password_hash]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
    static selectUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let users = [];
            let results = yield data_access_controller_1.DataAccessController.pool.query("SELECT user_id, email, name FROM users", 
            // depending on data volume, only user_id or email column should be selected
            []);
            // return result, ID is unique
            if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
                for (let row of results.rows) {
                    let user = new user_1.User();
                    user.user_id = row.user_id;
                    user.email = row.email;
                    user.name = row.name;
                    users.push(user);
                }
                return users;
            }
            throw new Error("User not found");
        });
    }
    static selectUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("SELECT user_id, email, name FROM users WHERE user_id = $1", [id]);
            // return result, ID is unique
            if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
                let user = new user_1.User();
                user.user_id = results.rows[0].user_id;
                user.email = results.rows[0].email;
                user.name = results.rows[0].name;
                return user;
            }
            throw new Error("User not found");
        });
    }
    static selectUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("SELECT user_id, email, name FROM users WHERE email = $1", [email]);
            // return result, email is unique
            if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
                let user = new user_1.User();
                user.user_id = results.rows[0].user_id;
                user.email = results.rows[0].email;
                user.name = results.rows[0].name;
                return user;
            }
            throw new Error("User not found");
        });
    }
    static selectUserPasswordHash(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("SELECT user_id, password_hash FROM users WHERE email = $1", [email]);
            // return result, ID is unique
            if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
                if (typeof results.rows[0].password_hash !== 'undefined') {
                    return {
                        user_id: results.rows[0].user_id,
                        password_hash: results.rows[0].password_hash
                    };
                }
            }
            throw new Error("User not found");
        });
    }
    static updateUserById(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("UPDATE users SET email = $1, name = $2 WHERE user_id = $3", [user.email, user.name, user.user_id]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("DELETE FROM users WHERE user_id = $1", [id]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
}
exports.UserDataController = UserDataController;
