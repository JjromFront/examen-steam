import { Sequelize } from "sequelize";
import Config from "../config";
const { nameDB, userDB, PasswordDB, hostDB, portDB } = Config;

const db = new Sequelize(nameDB, userDB, PasswordDB, {
    host: hostDB,
    dialect: "mysql",
    port: +portDB,
    logging: false,
});

db.sync();



export default db;
