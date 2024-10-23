import axios from 'axios';
import { OPENAI_API_KEY } from '../constants/secrets.js';
import { Pet } from '../database/models/pets/my-pets-model.js';

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

const ethicalMatchPrompt = (myPet: Pet, potentialBreed: {}) => [
	{
		role: 'system',
		content: `You are a very helpful assistant, i will provide you with data of two pets and you will tell me if they an breed.
    you will give me a score out of 10 and a brief summary of why, in json format with keys 'score' and 'summary'`,
	},
	{
		role: 'user',
		content: `pet1: ${myPet}
              pet2: ${potentialBreed}`,
	},
];

const model = 'gpt-3.5-turbo';

export { client, generatePrompt, ethicalMatchPrompt, model };
