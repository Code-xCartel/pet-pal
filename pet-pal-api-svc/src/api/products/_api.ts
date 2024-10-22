import { Router } from 'express';
import productsApi from './products.js';
import cartApi from './cart.js';

const app = Router();

app.use('/products', productsApi);
app.use('/cart', cartApi);

export default app;
