import { type Response, type Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createOne, getOneByField, updateOne } from '../../database/crud.js';
import { User } from '../../database/models/auth/auth-model.js';
import {
	JWT_SECRET_KEY,
	JWT_EXPIRY_DELTA,
	AUTH_METHOD,
} from '../../constants/secrets.js';
import SUBSCRIPTION_MODELS from '../../constants/subscription-models.js';
import { IRequest } from '../../middleware.js';

const register = async (req: Request, res: Response): Promise<void> => {
	const existingUser = await getOneByField(User, 'email', req.body.email);
	if (existingUser) {
		res.status(403).json({ error: 'Email already exist' });
		return;
	}
	const password = await bcrypt.hash(req.body.password, 10);
	const response = await createOne(User, {
		...req.body,
		password,
		isActive: false,
		subscription_model: SUBSCRIPTION_MODELS.get(1)!.fieldId,
	});
	res.status(201).json({ userCreated: response?._id });
	return;
};

const login = async (req: Request, res: Response): Promise<void> => {
	const existingUser = await getOneByField(User, 'email', req.body.email);
	if (!existingUser) {
		res.status(404).json({ error: `User doesn't exist` });
		return;
	}
	const match = await bcrypt.compare(req.body.password, existingUser.password);
	if (!match) {
		res.status(403).json({ error: 'Invalid credentials' });
		return;
	}
	const token = jwt.sign(
		{
			...req.body,
			username: existingUser.username,
			id: existingUser._id,
			subscription_model: existingUser.subscription_model,
		},
		JWT_SECRET_KEY,
		{ expiresIn: JWT_EXPIRY_DELTA }
	);
	res.status(200).json({ token, accessType: AUTH_METHOD });
	return;
};

const updateUsername = async (req: Request, res: Response): Promise<void> => {
	const existingUser = await getOneByField(
		User,
		'email',
		(req as IRequest).userToken.email
	);
	const response = await updateOne(User, existingUser?._id as string, {
		username: req.body.username,
	});
	res.status(200).json({ usernameUpdated: response?.username });
	return;
};

export { register, login, updateUsername };
