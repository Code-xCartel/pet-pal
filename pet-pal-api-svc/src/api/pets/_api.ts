import { Router } from 'express';
import myPetsApi from './my-pets.js';
import adoptionApi from './adoption.js';

const app = Router();

app.use('/adoption', adoptionApi);
app.use('/my-pets', myPetsApi);

export default app;
