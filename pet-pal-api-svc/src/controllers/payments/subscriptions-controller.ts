import { type Request, type Response } from "express";
import Stripe from 'stripe';
import { generateSubscriptionLineItems } from "../../utils/subscriptions.js";
import SUBSCRIPTION_MODELS from "../../constants/subscription-models.js";
import { updateOne } from "../../database/crud.js";
import { User } from "../../database/models/auth/auth-model.js";
import { STRIPE_DEV_SECRET_KEY } from "../../constants/secrets.js";
import { IRequest } from "../../middleware.js";
import { MetaData } from "./webhook-controller.js";

const stripe = new Stripe(STRIPE_DEV_SECRET_KEY);

const createSubscription = async (req: Request, res: Response): Promise<void> => {
  const requested_model = SUBSCRIPTION_MODELS.get(req.body.subscription_model)!;
  if (requested_model.fieldId === (req as IRequest).userToken.subscription_model) {
    res.status(403).json({ error: `User is already subscribed to ${requested_model.name} plan` });
    return;
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: generateSubscriptionLineItems(req.body.subscription_model),
    success_url: process.env.STRIPE_REDIRECT_SUCCESS,
    cancel_url: process.env.STRIPE_REDIRECT_CANCEL,
    metadata: {
      user_id: (req as IRequest).userToken.id,
      current_model: (req as IRequest).userToken.subscription_model,
      new_model: requested_model.fieldId,
    } as MetaData,
  });
  res.status(200).json({ session });
  return;
};

const cancelSubscription = async (req: Request, res: Response): Promise<void> => {
  const response = await updateOne(User, (req as IRequest).userToken.id,
    { subscription_model: SUBSCRIPTION_MODELS.get(1)!.fieldId }
  )
  res.status(200).json({ subscription_model: response?.subscription_model });
  return;
};

export { createSubscription, cancelSubscription };
