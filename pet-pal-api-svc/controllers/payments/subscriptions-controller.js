import Stripe from 'stripe';
import { generateSubscriptionLineItems } from "../../utils/subscriptions.js";
import SUBSCRIPTION_MODELS from "../../constants/subscription-models.js";
const stripe = new Stripe(process.env.STRIPE_DEV_SECRET_KEY);

const createSubscription = async (req, res) => {
  const requested_model = SUBSCRIPTION_MODELS.get(req.body.subscription_model);
  console.log(requested_model);
  if (requested_model.fieldId === req.userToken.subscription_model)
    return res.status(403).json({ error: `User is already subscribed to ${requested_model.name} plan` });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: generateSubscriptionLineItems(req.body.subscription_model),
    success_url: 'https://www.google.com',
    cancel_url: 'https://www.yahoo.com',
    metadata: {
      user_id: req.userToken.id,
      current_model: req.userToken.subscription_model,
      new_model: requested_model.fieldId,
    },
  });
  return res.status(200).json({ session });
};

export { createSubscription };
