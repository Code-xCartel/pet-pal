import { Router } from "express";
import { putPetForAdoption } from "../../controllers/pets/adoption-controller.js";
import requestValidator from "../../utils/request-validator.js";
import { idValidator } from "../../validators/common.js";

const app = Router();

app.put('/:id', idValidator('id'), requestValidator,putPetForAdoption);

export default app;
