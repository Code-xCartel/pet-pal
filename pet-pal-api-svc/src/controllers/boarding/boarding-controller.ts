import { type Request, type Response } from 'express';
import {
	createOne,
	deleteOne,
	getMany,
	getOne,
	getOneByField,
	updateOne,
} from '../../database/crud.js';
import { BoarderModel } from '../../database/models/auth/personnel-model.js';
import { BoarderRequestModel } from '../../database/models/requests/boarder-requests-model.js';
import { IRequest } from '../../middleware.js';

const getBoarders = async (req: Request, res: Response): Promise<void> => {
	const [count, documents] = await getMany(BoarderModel);
	res.status(200).json({ count, results: documents });
	return;
};

const getBoardingRequests = async (
	req: Request,
	res: Response
): Promise<void> => {
	const boarderUser = await getOneByField(
		BoarderModel,
		'userRefId',
		(req as IRequest).userToken.id
	);
	const query = {
		requestedId: {
			$in: boarderUser?._id,
		},
	};
	const [count, documents] = await getMany(BoarderRequestModel, query);
	res.status(200).json({ count, results: documents });
	return;
};

const createBoardingRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingBoarder = await getOne(BoarderModel, req.params.id);
	if (!existingBoarder) {
		res.status(400).send({ error: `Boarder not found: ${req.params.id}` });
		return;
	}
	const response = await createOne(BoarderRequestModel, {
		...req.body,
		status: 'pending',
		userSubscriptionModel: (req as IRequest).userToken.subscription_model,
	});
	res
		.status(201)
		.json({ message: `Boarding request created: ${response._id}` });
	return;
};

const cancelBoardingRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingRequest = await getOne(BoarderRequestModel, req.params.id);
	if (!existingRequest) {
		res.status(400).send({ error: `Request not found: ${req.params.id}` });
		return;
	}
	await deleteOne(BoarderRequestModel, req.params.id);
	res.status(200).json({ message: `Request deleted: ${req.params.id}` });
	return;
};

const acceptBoardingRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingRequest = await getOne(BoarderRequestModel, req.params.id);
	if (!existingRequest) {
		res.status(400).send({ error: `Request not found: ${req.params.id}` });
		return;
	}
	await updateOne(BoarderRequestModel, req.params.id, {
		status: 'accepted',
	});
	res.status(200).json({ message: `Request accepted: ${req.params.id}` });
	return;
};

const declineBoardingRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const existingRequest = await getOne(BoarderRequestModel, req.params.id);
	if (!existingRequest) {
		res.status(400).send({ error: `Request not found: ${req.params.id}` });
		return;
	}
	await updateOne(BoarderRequestModel, req.params.id, {
		status: 'rejected',
	});
	res.status(200).json({ message: `Request rejected: ${req.params.id}` });
	return;
};

export {
	getBoarders,
	getBoardingRequests,
	createBoardingRequest,
	cancelBoardingRequest,
	acceptBoardingRequest,
	declineBoardingRequest,
};
