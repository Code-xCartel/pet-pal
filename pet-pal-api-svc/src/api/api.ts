import { Router } from 'express';
import authApi from './auth/auth.js';
import petsApi from './pets/_api.js';
import paymentsApi from './payments/_api.js';

const app = Router();

app.use('/auth', authApi);
app.use('/pets', petsApi);
app.use('/payments', paymentsApi);

export default app;
