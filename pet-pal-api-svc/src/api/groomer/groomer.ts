import { Router } from 'express';
import {
	getGroomers,
	getGroomerRequests,
	cancelGroomerRequest,
	createGroomerRequest,
	acceptGroomerRequest,
	declineGroomerRequest,
} from '../../controllers/groomer/groomer-controller.js';
import { idValidator } from '../../validators/common.js';
import { validateRequest } from '../../middleware.js';
import { SUBSCRIPTION_LEVELS } from '../../constants/subscription-models.js';

const app = Router();

app.get(
	'/',
	validateRequest({ requiredSubscription: SUBSCRIPTION_LEVELS.PLUS }),
	getGroomers
);
app.get(
	'/requests',
	validateRequest({ requiredPersonnelGroomer: true }),
	getGroomerRequests
);
app.post(
	'/book/:id',
	idValidator('id'),
	validateRequest({ requiredSubscription: SUBSCRIPTION_LEVELS.PLUS }),
	createGroomerRequest
);
app.post(
	'cancel/:id',
	idValidator('id'),
	validateRequest({ requiredSubscription: SUBSCRIPTION_LEVELS.PLUS }),
	cancelGroomerRequest
);
app.post(
	'/accept/:id',
	idValidator('id'),
	validateRequest({ requiredPersonnelGroomer: true }),
	acceptGroomerRequest
);
app.post(
	'/decline/:id',
	idValidator('id'),
	validateRequest({ requiredPersonnelGroomer: true }),
	declineGroomerRequest
);

export default app;
