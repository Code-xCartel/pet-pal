export const ATLAS_CONNECTION_STRING = process.env
	.ATLAS_CONNECTION_STRING as string;
export const JWT_EXPIRY_DELTA = process.env.JWT_EXPIRY_DELTA as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const AUTH_METHOD = process.env.AUTH_METHOD as string;
export const STRIPE_DEV_SECRET_KEY = process.env
	.STRIPE_DEV_SECRET_KEY as string;
export const STRIPE_DEV_WEBHOOK_KEY = process.env
	.STRIPE_DEV_WEBHOOK_KEY as string;
