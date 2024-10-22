import { Router } from 'express';
import {
	register,
	updatePassword,
	login,
	updateUsername,
} from '../../controllers/auth/auth-controller.js';
import {
	registrationValidator,
	activationValidator,
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
app.post(
	'/activation',
	...activationValidator,
	validateRequest({ skip: true }),
	updatePassword
);
app.post('/login', ...loginValidator, validateRequest({ skip: true }), login);
app.post('/update', ...userNameValidator, validateRequest(), updateUsername);

export default app;
