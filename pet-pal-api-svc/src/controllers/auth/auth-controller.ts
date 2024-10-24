import { type Response, type Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import {
	createOne,
	deleteOne,
	getOne,
	getOneByField,
	updateOne,
} from '../../database/crud.js';
import { User } from '../../database/models/auth/auth-model.js';
import {
	JWT_SECRET_KEY,
	JWT_EXPIRY_DELTA,
	AUTH_METHOD,
} from '../../constants/secrets.js';
import SUBSCRIPTION_MODELS from '../../constants/subscription-models.js';
import { IRequest } from '../../middleware.js';
import transporter, {
	generateMailOptions,
} from '../../utils/mail-transporter.js';
import {
	BoarderModel,
	GroomerModel,
} from '../../database/models/auth/personnel-model.js';

const register = async (req: Request, res: Response): Promise<void> => {
	const existingUser = await getOneByField(User, 'email', req.body.email);
	if (existingUser) {
		res.status(403).json({ error: 'Email already exist' });
		return;
	}
	const canCreateAdmins = (req as IRequest).userToken?.isAdmin || false;
	const activationKey = v4();
	const password = await bcrypt.hash(req.body.password, 10);
	const response = await createOne(User, {
		username: req.body.username,
		email: req.body.email,
		password: !canCreateAdmins ? password : `${activationKey}`,
		isActive: false,
		subscriptionModel: SUBSCRIPTION_MODELS.get(1)!.fieldId,
		isAdmin: canCreateAdmins && req.body.isAdmin,
		isPersonnelBoarder: canCreateAdmins && req.body.isPersonnelBoarder,
		isPersonnelGroomer: canCreateAdmins && req.body.isPersonnelGroomer,
	});
	if (canCreateAdmins) {
		transporter.sendMail(
			generateMailOptions(
				req.body.email,
				response._id as string,
				activationKey
			),
			async (err) => {
				if (err) {
					await deleteOne(User, response._id as string);
					res.status(400).json({
						error: 'Error sending activation email, try again',
						details: err,
					});
					return;
				}
			}
		);
	}
	res.status(201).json({ message: `User created: ${response?._id}` });
	return;
};

const updatePassword = async (req: Request, res: Response): Promise<void> => {
	const existingUser = await getOne(User, req.body.id);
	if (!existingUser) {
		res.status(404).json({ error: `User not found: ${req.body.id}` });
		return;
	}
	if (existingUser.password !== req.body.key) {
		res.status(403).json({ error: 'Key mismatch' });
		return;
	}
	const password = await bcrypt.hash(req.body.password, 10);
	await updateOne(User, existingUser._id as string, { password });
	res
		.status(200)
		.json({ message: `User password updated: ${existingUser._id}` });
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
	const payload = {
		email: existingUser.email,
		username: existingUser.username,
		id: existingUser._id,
		subscription_model: existingUser.subscriptionModel,
		isAdmin: existingUser.isAdmin,
		isPersonnelBoarder: existingUser.isPersonnelBoarder,
		isPersonnelGroomer: existingUser.isPersonnelGroomer,
	};
	const token = jwt.sign(payload, JWT_SECRET_KEY, {
		expiresIn: JWT_EXPIRY_DELTA,
	});
	res.status(200).json({ token, accessType: AUTH_METHOD, user: payload });
	return;
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
	const existingUser = await getOne(User, (req as IRequest).userToken.id);
	if (!existingUser) {
		res.status(404).json({ error: `User doesn't exist` });
		return;
	}
	await updateOne(User, existingUser._id as string, {
		isActive: true,
		details: req.body,
	});
	res
		.status(200)
		.json({ message: `User details updated: ${existingUser._id}` });
};

const boardGroomer = async (req: Request, res: Response): Promise<void> => {
	const existingUser = await getOne(User, (req as IRequest).userToken.id);
	if (!existingUser) {
		res.status(404).json({ error: `User doesn't exist` });
		return;
	}
	const response = await createOne(GroomerModel, {
		...req.body,
		userRefId: existingUser._id,
	});
	await updateOne(User, existingUser._id as string, {
		isActive: true,
	});
	res.status(200).json({ message: `Groomer boarder: ${response._id}` });
	return;
};

const boardBoarder = async (req: Request, res: Response): Promise<void> => {
	const existingUser = await getOne(User, (req as IRequest).userToken.id);
	if (!existingUser) {
		res.status(404).json({ error: `User doesn't exist` });
		return;
	}
	const response = await createOne(BoarderModel, {
		...req.body,
		userRefId: existingUser._id,
	});
	await updateOne(User, existingUser._id as string, {
		isActive: true,
	});
	res.status(200).json({ message: `Boarder boarder: ${response._id}` });
	return;
};

export {
	register,
	updatePassword,
	login,
	updateUser,
	boardGroomer,
	boardBoarder,
};
