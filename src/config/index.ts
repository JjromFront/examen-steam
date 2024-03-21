import { config } from "dotenv";

config();

const Config = {
    port: process.env.PORT,
    secret: process.env.AUTH_JWT_SECRET || "",

    //db
    hostDB: process.env.HOST_DB || "",
    userDB: process.env.USER_DB || "",
    portDB: process.env.PORT_DB || "",
    nameDB: process.env.NAME_DB || "",
    PasswordDB: process.env.PASSWORD_DB || "",

}

export default Config;