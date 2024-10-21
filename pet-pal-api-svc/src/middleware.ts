import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AUTH_METHOD, JWT_SECRET_KEY } from './constants/secrets.js';

type UserToken = {
	email: string;
	password: string;
	id: string;
	subscription_model: string;
	username: string;
};

export type IRequest = Request & { userToken: UserToken };

const excludeFromAuth = ['/auth/login', '/auth/register', '/payments/webhook'];

const isExcludedFromAuth = (url: string) => {
	return excludeFromAuth.includes(url);
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (isExcludedFromAuth(req.url)) return next();
	const authHeader = req.headers['authorization'];
	if (!authHeader) return res.status(401).json({ error: 'Token not provided' });
	const [method, token] = authHeader && authHeader.split(' ');
	if (!method || method !== AUTH_METHOD)
		return res.status(401).json({ error: 'Invalid method' });
	jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
		if (err) return res.status(401).json({ error: 'Unauthorized' });
		(req as IRequest).userToken = decoded as UserToken;
		next();
	});
};

export { authMiddleware };
