import SUBSCRIPTION_MODELS from "../constants/subscription-models.js";

export const generateSubscriptionLineItems = (id) => {
  const selected_model = SUBSCRIPTION_MODELS.get(id);
  return [{
      price_data: {
        recurring: {
          interval: "year",
        },
        currency: 'INR',
        product_data: {
          name: selected_model.name,
        },
        unit_amount: selected_model.price,
      },
      quantity: 1,
  }]
};