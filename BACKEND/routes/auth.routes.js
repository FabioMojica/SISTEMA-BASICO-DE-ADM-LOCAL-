import { Router } from "express";
import { login, register, logout, verifyPassword } from "../controllers/auth.controller.js";
import { verifyToken } from '../controllers/auth.controller.js';
import verifyJwT from '../middlewares/verifyJwt.middleware.js'

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.post('/verifyPassword', verifyJwT, verifyPassword);
authRouter.get('/verify', verifyToken);

export default authRouter;