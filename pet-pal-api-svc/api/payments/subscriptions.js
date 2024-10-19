import { Router } from "express";
import { createSubscription } from "../../controllers/payments/subscriptions-controller.js";
import requestValidator from "../../utils/request-validator.js";
import {createSubscriptionValidator} from "../../validators/payments/subscriptions-validator.js";

const app = Router();

app.post('/create', ...createSubscriptionValidator, requestValidator, createSubscription);

export default app;
