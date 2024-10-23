import { type Request, type Response } from 'express';
import { getOne } from '../../database/crud.js';
import { PetsModel } from '../../database/models/pets/my-pets-model.js';
import { client, ethicalMatchPrompt, model } from '../../utils/gpt-config.js';
import { OPENAI_API_URL } from '../../constants/secrets.js';

const getMatchScore = async (req: Request, res: Response): Promise<void> => {
	const myPet = await getOne(PetsModel, req.body.myPet);
	const potentialPet = await getOne(PetsModel, req.body.potentialPet);
	if (!potentialPet || !myPet) {
		res.status(404).json({ error: 'Pet not found' });
		return;
	}
	const matchSummary = await client.post(OPENAI_API_URL, {
		model,
		messages: ethicalMatchPrompt(myPet._doc, potentialPet._doc),
	});
	res.status(200).json(matchSummary);
	return;
};

export { getMatchScore };
