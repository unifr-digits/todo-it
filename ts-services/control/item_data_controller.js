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
exports.ItemDataController = void 0;
const item_1 = require("../model/item");
const data_access_controller_1 = require("./data_access_controller");
class ItemDataController extends data_access_controller_1.DataAccessController {
    static insertItem(user_id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("INSERT INTO items (item_id, title, is_active, user_id) VALUES ($1, $2, $3, $4)", [item.item_id, item.title, item.is_active, user_id]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
    static selectItems(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = [];
            let results = yield data_access_controller_1.DataAccessController.pool.query("SELECT item_id, title, is_active FROM items WHERE user_id = $1", 
            // depending on data volume, only item_id or e.g. title column should be selected
            [user_id]);
            // return result, ID is unique
            if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
                for (let row of results.rows) {
                    let item = new item_1.Item();
                    item.item_id = row.item_id;
                    item.title = row.title;
                    item.is_active = row.is_active;
                    items.push(item);
                }
                return items;
            }
            throw new Error("No items for user found");
        });
    }
    static selectItem(user_id, item_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("SELECT item_id, title, is_active FROM items WHERE user_id = $1 and item_id = $2", [user_id, item_id]);
            // return result, ID is unique
            if (typeof results.rows !== 'undefined' && results.rows.length > 0) {
                let item = new item_1.Item();
                item.item_id = results.rows[0].item_id;
                item.title = results.rows[0].title;
                item.is_active = results.rows[0].is_active;
                return item;
            }
            throw new Error("Item not found");
        });
    }
    static updateItem(user_id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("UPDATE items SET title = $1, is_active = $2 WHERE user_id = $3 and item_id = $4", [item.title, item.is_active, user_id, item.item_id]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
    static deleteItem(user_id, item_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield data_access_controller_1.DataAccessController.pool.query("DELETE FROM items WHERE user_id = $1 and item_id = $2", [user_id, item_id]);
            if (typeof results.rowCount !== 'undefined' && results.rowCount > 0) {
                return;
            }
            throw new Error("Empty result");
        });
    }
}
exports.ItemDataController = ItemDataController;
