import { Router } from 'express';
import {
	createMyPets,
	getMyPets,
	getMySinglePet,
	updateMyPet,
} from '../../controllers/pets/my-pets-controller.js';
import { validateRequest } from '../../middleware.js';
import { idValidator } from '../../validators/common.js';
import { createPetValidator } from '../../validators/pets/my-pets-validator.js';

const app = Router();

app.get('/:owner_id', idValidator('owner_id'), validateRequest(), getMyPets);
app.get('/pet/:id', idValidator('id'), validateRequest(), getMySinglePet);
app.post('/', ...createPetValidator, validateRequest(), createMyPets);
app.put('/pet/:id', idValidator('id'), validateRequest(), updateMyPet);

export default app;
