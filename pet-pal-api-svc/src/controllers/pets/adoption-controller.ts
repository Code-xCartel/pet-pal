import { type Request, type Response } from 'express';
import { getOne, createOne, deleteOne } from '../../database/crud.js';
import { PetsModel } from '../../database/models/pets/my-pets-model.js';
import { AdoptionModel } from '../../database/models/pets/adoption-model.js';
import { IRequest } from '../../middleware.js';

const createPetAdoption = async (
	req: Request,
	res: Response
): Promise<void> => {
	const response = await createOne(AdoptionModel, req.body);
	res.status(200).json({ message: `Adoption created ${response._id}` });
	return;
};

const deletedAdoption = async (req: Request, res: Response): Promise<void> => {
	const adoption = await getOne(AdoptionModel, req.params.id);
	if (!adoption) {
		res.status(404).json({ error: 'Adoption not found' });
		return;
	}
	await deleteOne(AdoptionModel, req.params.id);
	res.status(200).json({ message: `Adoption deleted: ${adoption._id}` });
};

const putPetForAdoption = async (
	req: Request,
	res: Response
): Promise<void> => {
	const pet = await getOne(PetsModel, req.params.id);
	if (!pet) {
		res.status(404).json({ error: 'Pet not found' });
		return;
	}
	if ((req as IRequest).userToken.id !== pet.owner_id) {
		res.status(403).json({
			error:
				"You don't have permission to perform this action, invalid pet-owner combination",
		});
		return;
	}
	const { _id, created_at, updated_at, ...rest } = pet._doc;
	const newQuery = {
		...rest,
		adoption_status: 'available',
	};
	const response = await createOne(AdoptionModel, newQuery);
	await deleteOne(PetsModel, req.params.id);
	res.status(200).json({ message: `Adoption created ${response?._id}` });
	return;
};

const cancelAdoption = async (req: Request, res: Response): Promise<void> => {
	const pet = await getOne(AdoptionModel, req.params.id);
	if (!pet) {
		res.status(404).json({ error: 'Pet not found' });
		return;
	}
	if ((req as IRequest).userToken.id !== pet.owner_id) {
		res.status(403).json({
			error:
				"You don't have permission to perform this action, invalid pet-owner combination",
		});
		return;
	}
	const { _id, created_at, updated_at, adoption_status, ...rest } = pet._doc;
	const response = await createOne(PetsModel, rest);
	await deleteOne(AdoptionModel, req.params.id);
	res.status(200).json({ message: `Adoption cancelled: ${response._id}` });
	return;
};

export {
	createPetAdoption,
	deletedAdoption,
	putPetForAdoption,
	cancelAdoption,
};
