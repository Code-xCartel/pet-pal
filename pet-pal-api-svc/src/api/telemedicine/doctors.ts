import { Router } from 'express';

const app = Router();

app.get('/', (req, res) => {
	res.status(200).send('Hello World!');
});

export default app;
