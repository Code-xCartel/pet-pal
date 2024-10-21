import { Router } from 'express';
import {
	register,
	login,
	updateUsername,
} from '../../controllers/auth/auth-controller.js';
import {
	registrationValidator,
	loginValidator,
	userNameValidator,
} from '../../validators/auth/auth-validator.js';
import { validateRequest } from '../../middleware.js';

const app = Router();

app.post(
	'/register',
	...registrationValidator,
	validateRequest({ skip: true }),
	register
);
app.post('/login', ...loginValidator, validateRequest({ skip: true }), login);
app.post('/update', ...userNameValidator, validateRequest(), updateUsername);

export default app;
