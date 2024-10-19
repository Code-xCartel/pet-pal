import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_DEV_SECRET_KEY);
import { updateOne } from "../../database/crud.js";
import { User } from '../../database/models/auth/auth-model.js';

const webhookController = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_DEV_WEBHOOK_KEY);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { metadata: { user_id, new_model } } = session;
    await updateOne(User, user_id, { subscription_model: new_model })
  }

  res.json({ received: true });
};

export { webhookController };
