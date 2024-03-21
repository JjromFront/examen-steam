// auth.routes.ts
import { Router } from 'express';
import { AuthService } from '../services';

const router = Router();

const {signIn, signUp} = AuthService;

// Ruta para registro de usuario
router.post('/signup', signUp);

// Ruta para inicio de sesión
router.post('/signin', signIn);

module.exports = router;