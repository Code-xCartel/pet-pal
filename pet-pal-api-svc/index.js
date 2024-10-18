import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config'
import { ATLAS_CONNECTION_STRING } from "./constants/secrets.js";
import authMiddleware from './middleware.js';
import allRoutes from './api/api.js';

mongoose.connect(ATLAS_CONNECTION_STRING);
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use(allRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('api-svc started'));
