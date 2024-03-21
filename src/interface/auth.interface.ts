// interfaces.ts
interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    profileImage?: Express.Multer.File; // Archivo de imagen de perfil
}

interface SignInRequest {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: any; // Puedes definir una interfaz para el usuario si es necesario
}

export { SignUpRequest, SignInRequest, AuthResponse };
