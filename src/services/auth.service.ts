// authController.ts
import { Request, Response } from "express";
import { SignUpRequest, SignInRequest, AuthResponse } from "../interface/auth.interface";
import { UserModel } from "../models";
import { hashPassword, comparePassword } from "../helpers/bcrypt"; // Importa las funciones del helper de bcrypt
import jwt from "jsonwebtoken";
import Config from "../config";

const { secret } = Config;

const secretKey = secret; 

const signUp = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as SignUpRequest;

        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        if(!name || !email || !password) {
            res.status(400).json({message: "Debes poner todos los campos"})
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            profileImage: req.file ? req.file.path : undefined,
        });

        res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as SignInRequest;

        const existingUser = await UserModel.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        const isValidPassword = await comparePassword(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        if(!email || !password) {
            res.status(400).json({message: "Debes poner todos los campos"})
        }


        const token = jwt.sign({ userId: existingUser.id }, secretKey, { expiresIn: "1h" });

        const authResponse: AuthResponse = {
            token,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                profileImage: existingUser.profileImage,
            },
        };

        res.json(authResponse);
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default { signUp, signIn };
