import { Router } from 'express';
import {
	putPetForAdoption,
	cancelAdoption,
} from '../../controllers/pets/adoption-controller.js';
import { validateRequest } from '../../middleware.js';
import { idValidator } from '../../validators/common.js';

const app = Router();

app.put('/:id', idValidator('id'), validateRequest(), putPetForAdoption);
app.put('/cancel/:id', idValidator('id'), validateRequest(), cancelAdoption);

export default app;
