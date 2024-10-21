import SUBSCRIPTION_MODELS from '../constants/subscription-models.js';
import { type Stripe } from 'stripe';

export const generateSubscriptionLineItems = (id: number) => {
	const selected_model = SUBSCRIPTION_MODELS.get(id)!;
	return [
		{
			price_data: {
				recurring: {
					interval:
						'year' as Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring.Interval,
				},
				currency: 'INR',
				product_data: {
					name: selected_model.name,
				},
				unit_amount: selected_model.price,
			},
			quantity: 1,
		},
	];
};
