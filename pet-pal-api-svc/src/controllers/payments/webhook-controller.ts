import { type Request, type Response } from 'express';
import Stripe from 'stripe';
import { updateOne } from "../../database/crud.js";
import { User } from '../../database/models/auth/auth-model.js';
import { STRIPE_DEV_SECRET_KEY, STRIPE_DEV_WEBHOOK_KEY } from "../../constants/secrets.js";

export type MetaData = {
  user_id: string;
  current_model: string;
  new_model: string;
}

const stripe = new Stripe(STRIPE_DEV_SECRET_KEY);

const webhookController = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, STRIPE_DEV_WEBHOOK_KEY);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, new_model } = session.metadata as MetaData;
    await updateOne(User, user_id, { subscription_model: new_model })
  }

  res.json({ received: true });
};

export { webhookController };
