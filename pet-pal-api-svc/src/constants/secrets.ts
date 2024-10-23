export const ATLAS_CONNECTION_STRING = process.env
	.ATLAS_CONNECTION_STRING as string;
export const MONITORING_CONNECTION_STRING = process.env
	.MONITORING_CONNECTION_STRING as string;
export const JWT_EXPIRY_DELTA = process.env.JWT_EXPIRY_DELTA as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const AUTH_METHOD = process.env.AUTH_METHOD as string;
export const STRIPE_DEV_SECRET_KEY = process.env
	.STRIPE_DEV_SECRET_KEY as string;
export const STRIPE_DEV_WEBHOOK_KEY = process.env
	.STRIPE_DEV_WEBHOOK_KEY as string;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
export const OPENAI_API_URL = process.env.OPENAI_API_URL as string;
export const MAIL_SERVICE = process.env.MAIL_SERVICE as string;
export const MAIL_SERVICE_USER = process.env.MAIL_SERVICE_USER as string;
export const MAIL_SERVICE_PASSWORD = process.env
	.MAIL_SERVICE_PASSWORD as string;
export const CLIENT_WORKFLOW_URL = process.env.CLIENT_WORKFLOW_URL as string;
