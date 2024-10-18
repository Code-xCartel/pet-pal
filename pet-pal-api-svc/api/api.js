import { Router } from "express";
import authApi from './auth/auth.js';

const app = Router();

app.use('/auth', authApi);

export default app;