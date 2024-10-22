import { type Request, type Response } from 'express';
import {
	getOneByField,
	createOne,
	deleteOne,
	updateOne,
} from '../../database/crud.js';
import { CartModel } from '../../database/models/products/cart-model.js';
import { IRequest } from '../../middleware.js';

const getMyCart = async (req: Request, res: Response) => {
	const userId = (req as IRequest).userToken.id;
	const response = await getOneByField(CartModel, 'userId', userId);
	res.status(200).json(response);
	return;
};

const createCart = async (req: Request) => {
	return await createOne(CartModel, req.body);
};

const deleteCart = async (id: string) => {
	return await deleteOne(CartModel, id);
};

const cartActions = async (req: Request, res: Response): Promise<void> => {
	const userId = (req as IRequest).userToken.id;
	const response = await getOneByField(CartModel, 'userId', userId);
	if (!response) {
		await createCart(req);
	} else {
		const updatedCart = await updateOne(
			CartModel,
			response._id as string,
			req.body
		);
		if (updatedCart && updatedCart.items.length < 1)
			await deleteCart(updatedCart._id as string);
	}
	return;
};

export { getMyCart, cartActions };
