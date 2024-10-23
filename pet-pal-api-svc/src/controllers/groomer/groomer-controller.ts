import { type Request, type Response } from 'express';
import {
	createOne,
	deleteOne,
	getMany,
	getOne,
	getOneByField,
	updateOne,
} from '../../database/crud.js';
import { GroomerModel } from '../../database/models/auth/personnel-model.js';
import { GroomerRequestModel } from '../../database/models/requests/groomer-requests-model.js';
import { IRequest } from '../../middleware.js';

const getGroomers = async (req: Request, res: Response): Promise<void> => {
	const [count, documents] = await getMany(GroomerModel);
	res.status(200).json({ count, results: documents });
	return;
};

const getGroomerRequests = async (
	req: Request,
	res: Response
): Promise<void> => {
	const groomerUser = await getOneByField(
		GroomerModel,
		'userRefId',
		(req as IRequest).userToken.id
	);
	const query = {
		requestedId: {
			$in: groomerUser?._id,
		},
	};
	const [count, documents] = await getMany(GroomerRequestModel, query);
	res.status(200).json({ count, results: documents });
	return;
};

const createGroomerRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingGroomer = await getOne(GroomerModel, req.params.id);
	if (!existingGroomer) {
		res.status(400).send({ error: `Groomer not found: ${req.params.id}` });
		return;
	}
	const response = await createOne(GroomerRequestModel, {
		...req.body,
		status: 'pending',
	});
	res.status(201).json({ message: `Groomer request created: ${response._id}` });
	return;
};

const cancelGroomerRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingRequest = await getOne(GroomerRequestModel, req.params.id);
	if (!existingRequest) {
		res.status(400).send({ error: `Request not found: ${req.params.id}` });
		return;
	}
	await deleteOne(GroomerRequestModel, req.params.id);
	res.status(200).json({ message: `Request deleted: ${req.params.id}` });
	return;
};

const acceptGroomerRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingRequest = await getOne(GroomerRequestModel, req.params.id);
	if (!existingRequest) {
		res.status(400).send({ error: `Request not found: ${req.params.id}` });
		return;
	}
	await updateOne(GroomerRequestModel, req.params.id, {
		status: 'accepted',
	});
	res.status(200).json({ message: `Request accepted: ${req.params.id}` });
	return;
};

const declineGroomerRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingRequest = await getOne(GroomerRequestModel, req.params.id);
	if (!existingRequest) {
		res.status(400).send({ error: `Request not found: ${req.params.id}` });
		return;
	}
	await updateOne(GroomerRequestModel, req.params.id, {
		status: 'rejected',
	});
	res.status(200).json({ message: `Request rejected: ${req.params.id}` });
	return;
};

const completeGroomerRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingRequest = await getOne(GroomerRequestModel, req.params.id);
	if (!existingRequest) {
		res.status(400).send({ error: `Request not found: ${req.params.id}` });
		return;
	}
	await deleteOne(GroomerRequestModel, req.params.id);
	res.status(200).json({ message: `Request completed ${req.params.id}` });
	return;
};

export {
	getGroomers,
	getGroomerRequests,
	createGroomerRequest,
	cancelGroomerRequest,
	acceptGroomerRequest,
	declineGroomerRequest,
	completeGroomerRequest,
};
