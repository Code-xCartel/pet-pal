import { Router } from 'express';
import subscriptionsApi from './subscriptions.js';
import webhookApi from './webhook.js';

const app = Router();

app.use('/subscriptions', subscriptionsApi);
app.use('/webhook', webhookApi);

export default app;
