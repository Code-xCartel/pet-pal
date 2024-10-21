import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AUTH_METHOD, JWT_SECRET_KEY } from './constants/secrets.js';
import {
	SUBSCRIPTION_INDEX_MAP,
	SUBSCRIPTION_LEVELS,
	SubscriptionPlan,
} from './constants/subscription-models.js';
import { validationResult } from 'express-validator';

type UserToken = {
	email: string;
	id: string;
	subscription_model: SubscriptionPlan;
	username: string;
};

export type IRequest = Request & { userToken: UserToken };

const excludeFromAuth = ['/auth/login', '/auth/register', '/payments/webhook'];

const isExcludedFromAuth = (url: string) => {
	return excludeFromAuth.includes(url);
};

const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (isExcludedFromAuth(req.url)) return next();
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		res.status(401).json({ error: 'Token not provided' });
		return;
	}
	const [method, token] = authHeader && authHeader.split(' ');
	if (!method || method !== AUTH_METHOD) {
		res.status(401).json({ error: 'Invalid method' });
		return;
	}
	jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
		if (err) return res.status(401).json({ error: 'Unauthorized' });
		(req as IRequest).userToken = decoded as UserToken;
		next();
	});
};

const validateRequest =
	(requiredSubscription: SubscriptionPlan = SUBSCRIPTION_LEVELS.BASIC) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const userSubscription = (req as IRequest).userToken.subscription_model;
		if (
			!(
				SUBSCRIPTION_INDEX_MAP.indexOf(userSubscription) >=
				SUBSCRIPTION_INDEX_MAP.indexOf(requiredSubscription)
			)
		) {
			res
				.status(403)
				.json({ error: 'Upgrade your plan to access these features.' });
			return;
		}
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
			return;
		}
		next();
	};

export { authMiddleware, validateRequest };
