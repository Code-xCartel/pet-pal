import { Router } from "express";
import { putPetForAdoption } from "../../controllers/pets/adoption-controller.js";

const app = Router();

app.put('/:id', putPetForAdoption);

export default app;
