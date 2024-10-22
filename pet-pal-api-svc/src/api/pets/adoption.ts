import { Router } from 'express';
import {
	createPetAdoption,
	putPetForAdoption,
	cancelAdoption,
} from '../../controllers/pets/adoption-controller.js';
import { validateRequest } from '../../middleware.js';
import { idValidator } from '../../validators/common.js';
import { petsValidator } from '../../validators/pets/my-pets-validator.js';
import { deleteDoctor } from '../../controllers/telemedicine/doctors-controller.js';

const app = Router();

app.post(
	'/create',
	...petsValidator,
	validateRequest({ requirePersonnel: true }),
	createPetAdoption
);
app.delete(
	'delete/:id',
	idValidator('id'),
	validateRequest({ requirePersonnel: true }),
	deleteDoctor
);
app.put('update/:id', idValidator('id'), validateRequest(), putPetForAdoption);
app.put('/cancel/:id', idValidator('id'), validateRequest(), cancelAdoption);

export default app;
