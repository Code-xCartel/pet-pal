import { Router } from 'express';
import { cartValidator } from '../../validators/products/cart-validator.js';
import {
	getMyCart,
	cartActions,
} from '../../controllers/products/cart-ontroller.js';

const app = Router();

app.get('/', getMyCart);
app.put('/', ...cartValidator, cartActions);

export default app;
