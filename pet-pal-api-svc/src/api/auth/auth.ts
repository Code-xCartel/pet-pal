import { Router, type RequestHandler } from "express";
import { register, login, updateUsername } from "../../controllers/auth/auth-controller.js";
import { registrationValidator, loginValidator, userNameValidator } from "../../validators/auth/auth-validator.js";
import validateRequest from "../../utils/request-validator.js";

const app = Router();

app.post('/register', ...registrationValidator, validateRequest as RequestHandler, register);
app.post('/login', ...loginValidator, validateRequest as RequestHandler, login);
app.post('/update', ...userNameValidator, validateRequest as RequestHandler, updateUsername);

export default app;