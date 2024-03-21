import express, { Application } from "express";
import Config from "../config";
import fileUpload from "express-fileupload";
import cors from "cors";
import db from "../db/connection";
import morgan from "morgan";
import bodyParser from "body-parser";
import { ApiPaths } from "../routes";

class Server {
    private app: Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = Config.port || 3000;

        this.dbConnection();
        this.middleware();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Database online");
        } catch (error) {
            throw new Error(error as string);
        }
    }

    middleware() {
        // Configuramos cors
        this.app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] }));

        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan("dev"));

        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: "tmp",
                createParentPath: true,
            })
        );
    }

    routes() {
        console.log(ApiPaths);
        ApiPaths.forEach(({ url, router }) =>
            this.app.use(`/api${url}`, require(`../router/${router}`))
        );
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }

}

export default Server;