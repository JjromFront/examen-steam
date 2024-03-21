import { Request, Response } from "express";
import { VerifyErrors, verify } from "jsonwebtoken";
import Config from "../config";


const secret = Config.secret || "test";

const ValidarJWT = async (req: Request, res: Response, next: () => void) => {
    let token = req.headers.authorization || "";
    if (typeof token === "object") {
        return res.status(503).json({
            msg: "Not provided token",
        });
    }
    token = token.split(" ")[1] || "";
    if (token) {
        verify(token, secret, async (err: VerifyErrors | null, decoded) => {
            if (err) {
                return res.status(403).json({
                    msg: "Failed to authenticate token",
                });
            }
            req.body.decoded = decoded;
            next();
        });
    } else {
        res.status(503).json({
            msg: "Not provided token",
        });
    }
};

export default ValidarJWT;
