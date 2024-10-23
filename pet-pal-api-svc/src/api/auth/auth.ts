import { Router } from 'express';
import {
	register,
	updatePassword,
	login,
	updateUser,
	boardGroomer,
	boardBoarder,
} from '../../controllers/auth/auth-controller.js';
import {
	registrationValidator,
	activationValidator,
	loginValidator,
	userUpdateValidator,
	groomerBoarderValidator,
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
app.post('/update', ...userUpdateValidator, validateRequest(), updateUser);
app.post(
	'/board-groomer',
	...groomerBoarderValidator,
	validateRequest(),
	boardGroomer
);
app.post(
	'/board-boarder',
	...groomerBoarderValidator,
	validateRequest(),
	boardBoarder
);

export default app;
