import { Router } from 'express';
import {
	putPetForAdoption,
	cancelAdoption,
} from '../../controllers/pets/adoption-controller.js';
import requestValidator from '../../utils/request-validator.js';
import { idValidator } from '../../validators/common.js';

const app = Router();

app.put('/:id', idValidator('id'), requestValidator, putPetForAdoption);
app.put('/cancel/:id', idValidator('id'), requestValidator, cancelAdoption);

export default app;
