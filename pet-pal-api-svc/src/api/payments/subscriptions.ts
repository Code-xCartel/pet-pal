import { Router } from 'express';
import {
	createSubscription,
	cancelSubscription,
} from '../../controllers/payments/subscriptions-controller.js';
import requestValidator from '../../utils/request-validator.js';
import { createSubscriptionValidator } from '../../validators/payments/subscriptions-validator.js';

const app = Router();

app.post(
	'/create',
	...createSubscriptionValidator,
	requestValidator,
	createSubscription
);
app.put('/cancel', cancelSubscription);

export default app;
