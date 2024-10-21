import axios from 'axios';
import { OPENAI_API_KEY } from '../constants/secrets.js';

const client = axios.create({
	headers: {
		Authorization: `Bearer ${OPENAI_API_KEY}`,
	},
});

const generatePrompt = (petData: {}, messageContext: []) => [
	{
		role: 'system',
		content: `You are a very helpful veterinary,who is going to help me with my pets.
			I will provide you the details of my pet, and then ask questions about its health or general questions.`,
	},
	{
		role: 'user',
		content: `hello, this is all the information, about my pet, i want to ask questions about it ${petData}`,
	},
	...messageContext.splice(2),
];

const model = 'gpt-3.5-turbo';

export { client, generatePrompt, model };
