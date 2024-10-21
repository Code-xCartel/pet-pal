import { Router, type RequestHandler } from "express";
import { createSubscription, cancelSubscription } from "../../controllers/payments/subscriptions-controller.js";
import requestValidator from "../../utils/request-validator.js";
import { createSubscriptionValidator } from "../../validators/payments/subscriptions-validator.js";

const app = Router();

app.post('/create', ...createSubscriptionValidator, requestValidator as RequestHandler, createSubscription);
app.put('/cancel', cancelSubscription)

export default app;
