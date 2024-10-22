import { Router } from 'express';
import { productsValidator } from '../../validators/products/products-validator.js';
import { validateRequest } from '../../middleware.js';
import { idValidator } from '../../validators/common.js';
import {
	getProducts,
	getSingleProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../../controllers/products/products-controller.js';

const app = Router();

app.get('/', getProducts);
app.get('/:id', idValidator('id'), getSingleProduct);
app.post(
	'/',
	...productsValidator,
	validateRequest({ requiredAdmin: true }),
	createProduct
);
app.put(
	'/:id',
	idValidator('id'),
	...productsValidator,
	validateRequest({ requiredAdmin: true }),
	updateProduct
);
app.delete(
	'/:id',
	idValidator('id'),
	validateRequest({ requiredAdmin: true }),
	deleteProduct
);

export default app;
