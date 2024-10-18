import { Router } from "express";
import { register, login, updateUsername } from "../../controllers/auth/auth-controller.js";
import { registrationValidator, loginValidator, userNameValidator } from "../../validators/auth/auth.js";
import validateRequest from "../../utils/request-validator.js";

const app = Router();

app.post('/register', ...registrationValidator, validateRequest, register);
app.post('/login', ...loginValidator, validateRequest, login);
app.post('/update', ...userNameValidator, validateRequest, updateUsername );

export default app;