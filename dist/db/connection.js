"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const { nameDB, userDB, PasswordDB, hostDB, portDB } = config_1.default;
const db = new sequelize_1.Sequelize(nameDB, userDB, PasswordDB, {
    host: hostDB,
    dialect: "mysql",
    port: +portDB,
});
db.sync();
exports.default = db;
