import { Router } from "express";
import authApi from './auth/auth.js';
import petsApi from './pets/_api.js';

const app = Router();

app.use('/auth', authApi);
app.use('/pets', petsApi);

export default app;