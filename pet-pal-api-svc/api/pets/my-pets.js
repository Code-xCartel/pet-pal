import { Router } from "express";
import { createMyPets, getMyPets, getMySinglePet, updateMyPet } from "../../controllers/pets/my-pets-controller.js";

const app = Router();

app.get('/:owner_id', getMyPets);
app.get('/pet/:id', getMySinglePet);
app.post('/', createMyPets);
app.put('/pet/:id', updateMyPet)

export default app;