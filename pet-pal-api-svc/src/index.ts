import express, { type RequestHandler } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config'
import { ATLAS_CONNECTION_STRING } from "./constants/secrets.js";
import { authMiddleware } from './middleware.js';
import allRoutes from './api/api.js';

mongoose.connect(ATLAS_CONNECTION_STRING).then(_=> console.log('db-svc-connected'));
const app = express();

app.use(cors());
app.use('/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware as RequestHandler);
app.use(allRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('api-svc started'));
