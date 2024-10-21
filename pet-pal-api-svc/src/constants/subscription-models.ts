export type SubscriptionPlan = 'basic' | 'plus' | 'gold';

export const SUBSCRIPTION_LEVELS = {
	BASIC: 'basic',
	PLUS: 'plus',
	GOLD: 'gold',
} as const;

export const SUBSCRIPTION_INDEX_MAP = [
	SUBSCRIPTION_LEVELS.BASIC,
	SUBSCRIPTION_LEVELS.PLUS,
	SUBSCRIPTION_LEVELS.GOLD,
] as const;

const SUBSCRIPTION_MODELS = new Map([
	[1, { price: 0, name: 'Basic', fieldId: SUBSCRIPTION_LEVELS.BASIC }],
	[2, { price: 10000, name: 'Plus+', fieldId: SUBSCRIPTION_LEVELS.PLUS }],
	[3, { price: 50000, name: 'Gold*', fieldId: SUBSCRIPTION_LEVELS.GOLD }],
]);

export default SUBSCRIPTION_MODELS;
