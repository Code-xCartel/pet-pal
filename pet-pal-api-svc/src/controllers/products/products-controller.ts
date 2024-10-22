import { type Request, type Response } from 'express';
import {
	createOne,
	deleteOne,
	getMany,
	getOne,
	updateOne,
} from '../../database/crud.js';
import { ProductModel } from '../../database/models/products/products-model.js';

const getProducts = async (req: Request, res: Response): Promise<void> => {
	const [count, documents] = await getMany(ProductModel);
	res.status(200).json({ count, results: documents });
	return;
};

const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
	const response = await getOne(ProductModel, req.params.id);
	if (!response) {
		res.status(404).json({ error: `Product not found: ${req.params.id}` });
	}
	res.status(200).json(response);
	return;
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
	const response = await createOne(ProductModel, req.body);
	res.status(201).json({ message: `Product created: ${response._id}` });
	return;
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
	const existingProduct = await getOne(ProductModel, req.params.id);
	if (!existingProduct) {
		res.status(404).json({ error: `Product not found: ${req.params.id}` });
		return;
	}
	await updateOne(ProductModel, req.params.id, req.body);
	res.status(200).json({ message: `Pet updated: ${existingProduct._id}` });
	return;
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	const existingProduct = await getOne(ProductModel, req.params.id);
	if (!existingProduct) {
		res.status(404).json({ error: `Product not found: ${req.params.id}` });
		return;
	}
	await deleteOne(ProductModel, req.params.id);
	res.status(200).json({ message: `Pet Deleted: ${existingProduct._id}` });
	return;
};

export {
	getProducts,
	getSingleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
