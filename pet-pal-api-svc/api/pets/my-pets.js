import { Router } from "express";
import { createMyPets, getMyPets, getMySinglePet, updateMyPet } from "../../controllers/pets/my-pets-controller.js";
import requestValidator from "../../utils/request-validator.js";
import { idValidator } from "../../validators/common.js";
import { createPetValidator } from "../../validators/pets/my-pets-validator.js";

const app = Router();

app.get('/:owner_id', idValidator('owner_id'), requestValidator, getMyPets);
app.get('/pet/:id', idValidator('id'), requestValidator, getMySinglePet);
app.post('/', ...createPetValidator, requestValidator, createMyPets);
app.put('/pet/:id', idValidator('id'), requestValidator, updateMyPet)

export default app;