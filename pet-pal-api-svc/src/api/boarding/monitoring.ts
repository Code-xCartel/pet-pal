import { Router } from 'express';
import { idValidator } from '../../validators/common.js';
import { validateRequest } from '../../middleware.js';
import {
	createLiveSession,
	closeLiveSession,
	watchLiveSession,
} from '../../controllers/boarding/monitoring-controller.js';
import { SUBSCRIPTION_LEVELS } from '../../constants/subscription-models.js';
import { monitoringValidator } from '../../validators/boarding/monitoring-validator.js';

const app = Router();

app.get(
	'/live/:id',
	idValidator('id'),
	validateRequest({ requiredSubscription: SUBSCRIPTION_LEVELS.GOLD }),
	watchLiveSession
);
app.post(
	'/start',
	idValidator('id'),
	...monitoringValidator,
	validateRequest({ requiredPersonnelBoarder: true }),
	createLiveSession
);
app.post(
	'/close/:id',
	idValidator('id'),
	validateRequest({ requiredPersonnelBoarder: true }),
	closeLiveSession
);

export default app;
