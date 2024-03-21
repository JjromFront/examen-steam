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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("../routes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.default.port || 3000;
        this.dbConnection();
        this.middleware();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Database online");
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middleware() {
        // Configuramos cors
        this.app.use((0, cors_1.default)({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] }));
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: "tmp",
            createParentPath: true,
        }));
    }
    routes() {
        console.log(routes_1.ApiPaths);
        routes_1.ApiPaths.forEach(({ url, router }) => this.app.use(`/api${url}`, require(`../router/${router}`)));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}
exports.default = Server;
